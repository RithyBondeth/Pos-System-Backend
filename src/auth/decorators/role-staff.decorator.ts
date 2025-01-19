import { SetMetadata } from "@nestjs/common";
import { Role } from "@app/common/database/entities/staff/role.entity";

export const StaffRole = (...roles: Role['name'][]) => {
    return SetMetadata("roles", roles);
}