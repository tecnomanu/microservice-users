import { IsEmail, IsNotEmpty, IsOptional, IsString, MinLength } from "class-validator";
import { Match } from "src/decorator/match.decorator";

export class CreateUserDto {
    @IsEmail()
    @IsNotEmpty()
    readonly email: string;

    @IsString()
    @IsNotEmpty()
    readonly firstName: string;

    @IsString()
    @IsOptional()
    readonly lastName: string;

    @IsString()
    @IsNotEmpty()
    @MinLength(8)
    readonly password: string;

    @IsString()
    @Match('password')
    readonly password_confirmation: string;
}