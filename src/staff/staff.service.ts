import { BadRequestException, ConflictException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Staff } from 'src/entities/staff/staff.entity';
import { Repository } from 'typeorm';
import { CreateStaffDto } from './dtos/create-staff.dto';
import * as path from 'path';
import { UploadfileService } from '@app/common/uploadfile/uploadfile.service';
import { GenderE } from 'src/entities/staff/staff.type';
import { Role } from 'src/entities/staff/role.entity';
import { ConfigService } from '@nestjs/config';
import { GetStaffDto } from './dtos/get-staff.dto';
import { UpdateStaffDto } from './dtos/update-staff.dto';
import { CreateStaffT } from './types/create-staff.type';
import { UpdateStaffT } from './types/update-staff.type';

@Injectable()
export class StaffService {
    constructor(
        @InjectRepository(Staff) private readonly staffRepo: Repository<Staff>,
        @InjectRepository(Role) private readonly roleRepo: Repository<Role>,
        private readonly configService: ConfigService,
        private readonly uploadfileService: UploadfileService,
    ){}
    
    async findAll(): Promise<GetStaffDto[]> {
        const staff = await this.staffRepo.find({ relations: ['role'] });
        if(staff.length === 0) throw new NotFoundException("There are no staff available");

        return staff.map((st) => new GetStaffDto(st));
    }

    async findOneById(staffId: number): Promise<GetStaffDto> {
        const staff = await this.staffRepo.findOne({ where: { id: staffId }, relations: ['role'] });
        if(!staff) throw new NotFoundException(`There is no staff with id ${staffId}`); 
        
        return new GetStaffDto(staff);
    }

    async createStaff(body: CreateStaffDto, profile: Express.Multer.File): Promise<CreateStaffT> {
        try {
            let staff = await this.staffRepo.findOne({ where: { email: body.email } });
            if(staff) {
                if(profile) {
                    const profilePath = path.join(process.cwd(), 'storage/profiles', profile.filename);
                    UploadfileService.deleteFile(profilePath, 'Profile Image')
                }
                throw new ConflictException(`User with ${body.email} is already exists`);
            }

            let profileImage = null;
            if(profile) {
                profileImage = this.uploadfileService.getUploadFile('profiles', profile);
            } else {
                if(body.gender === GenderE.MALE) 
                    profileImage = this.configService.get<string>('BASE_URL') + this.configService.get<string>('DEFAULT_MALE_PROFILE')
                else if(body.gender === GenderE.FEMALE) 
                    profileImage = this.configService.get<string>('BASE_URL') + this.configService.get<string>('DEFAULT_FEMALE_PROFILE');
            }

            let role = await this.roleRepo.findOne({ where: { name: body.role } });
            if(!role) {
                role = this.roleRepo.create({ name: body.role });
                await this.roleRepo.save(role);
            }

            staff = this.staffRepo.create({
                ...body,
                role: role,
                profile: profileImage,
            })
            await this.staffRepo.save(staff);

            return {
                message: "Created Staff Successfully",
                staff: new GetStaffDto(staff),
            }
        } catch (error) {
            console.error("Failed to create staff: ", error.message);
            throw new BadRequestException("Failed to create staff");
        }      
    }

    async updateStaff(staffId: number, body: UpdateStaffDto, profile: Express.Multer.File): Promise<UpdateStaffT> {
        try {
            //Find staff to update by ID
            let staff = await this.staffRepo.findOne({ where: { id: staffId }, relations: ['role'] });
            if(!staff) {
                //Clean up profile image if staff is not found
                if(profile) {
                    const profilePath = path.join(process.cwd(), 'storage/profiles', profile.filename);
                    UploadfileService.deleteFile(profilePath, 'Profile Image');
                } 
                throw new NotFoundException(`There is no staff with id ${staffId}`);
            }

            //Handle profile update
            if(profile) {
                const profileImage = this.uploadfileService.getUploadFile('profiles', profile);     
                //Delete the old profile if it exists and is not the deafult profile
                if(staff.profile && !staff.profile.includes('default')) {
                    const oldProfilePath = path.join(process.cwd(),'storage/profiles', staff.profile.split('/').pop());
                    UploadfileService.deleteFile(oldProfilePath, 'Profile Image');
                }
                
                // Save the new profile image
                staff.profile = profileImage;
            }

            //Handle gender update based on gender
            if(body.gender) {
                if(body.gender === GenderE.MALE && staff.profile.includes('default')) 
                    staff.profile = this.configService.get<string>('BASE_URL') + this.configService.get<string>('DEFAULT_MALE_PROFILE');
                else if(body.gender === GenderE.FEMALE && staff.profile.includes('default'))
                    staff.profile = this.configService.get<string>('BASE_URL') + this.configService.get<string>('DEFAULT_FEMALE_PROFILE');
            }

            //Handle role update
            if(body.role) {
                const role = await this.roleRepo.findOne({ where: { name: body.role } });
                if(!role) throw new NotFoundException(`There is no ${body.role}. Please create a new role first`);

                staff.role = role;          
            }

            //Update staff information dynamically while protecting sensitive fields
            const updatableFields = [
                'firstname', 'lastname', 'gender', 'dob', 'address',
                'email', 'phoneNumber', 'shift', 'salary'
            ]

            //staff.firstname = body.firstname
            //staff.lastname = body.lastname
            Object.entries(body).forEach(([key, value]) => {
                if(value !== undefined && updatableFields.includes(key)) {
                    staff[key] = value;
                }
            })
            
            //Save the updated staff to the database
            await this.staffRepo.save(staff);
            
            //Return the updated staff with message
            return {
                message: "Updated Staff Successfully",
                staff: new GetStaffDto(staff),
            }
        } catch (error) {
            console.error("Failed to update staff: ", error.message);
            throw new BadRequestException("Falied to update staff");
        }
    }
}