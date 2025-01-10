import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Staff } from 'src/entities/staff/staff.entity';
import { Repository } from 'typeorm';

@Injectable()
export class StaffService {
    constructor(@InjectRepository(Staff) private readonly staffRepo: Repository<Staff>){}
    
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
}