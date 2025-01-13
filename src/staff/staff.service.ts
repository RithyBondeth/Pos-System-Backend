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

@Injectable()
export class StaffService {
    constructor(
        @InjectRepository(Staff) private readonly staffRepo: Repository<Staff>,
        @InjectRepository(Role) private readonly roleRepo: Repository<Role>,
        private readonly configService: ConfigService,
        private readonly uploadfileService: UploadfileService,
    ){}
    
    async findAll() {
        const staff = await this.staffRepo.find();
        if(staff.length === 0) throw new NotFoundException("There are no staff available");

        return staff;
    }

    async findOneById(staffId: number) {
        const staff = await this.staffRepo.findOne({ where: { id: staffId } });
        if(!staff) throw new NotFoundException(`There is no staff with id ${staffId}`); 
        
        return staff;
    }

    async createStaff(body: CreateStaffDto, profile: Express.Multer.File) {
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
                else 
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
                data: staff,
            }
        } catch (error) {
            console.log("CREATED ERROR: ", error.message);
            throw new BadRequestException("Failed to create staff");
        }      
    }
}