import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsEmail, IsString, IsUUID } from 'class-validator';

export class FindUserReqDto {
  @ApiProperty({ required: true })
  @IsUUID()
  id: string;
}

export class CreateUserReqDto {
  @ApiProperty({ required: true, example: 'bok0815' })
  id: string;

  @ApiProperty({ required: true, example: '111' })
  password: string;

  @ApiProperty({ required: true, example: '111' })
  passwordConfirm: string;

  @ApiPropertyOptional({ required: true })
  @IsEmail()
  email?: string;

  @ApiPropertyOptional({ required: true })
  @IsString()
  name?: string;

  @ApiPropertyOptional({ required: true })
  phone: string;

  cart?: any;
}
