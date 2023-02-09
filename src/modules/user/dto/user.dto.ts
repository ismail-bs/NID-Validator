import { ApiProperty } from '@nestjs/swagger';
import { User, Role } from 'src/entity';

export class UserDto implements User {
  @ApiProperty()
  id: string;

  @ApiProperty()
  email: string;

  @ApiProperty()
  name: string;

  @ApiProperty()
  password: string;

  @ApiProperty({ enum: Role })
  role: Role;
}
