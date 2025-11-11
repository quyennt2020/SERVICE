import { Controller, Get, Post, Patch, Body, Param, UseGuards, Query } from '@nestjs/common';
import { UsersService } from './users.service';
import { AdminGuard } from '../auth/guards/admin.guard';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';

@Controller('users')
@UseGuards(JwtAuthGuard, AdminGuard)
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get()
  findAll(@Query('role') role?: string) {
    return this.usersService.findAll({ role });
  }

  @Patch(':id/role')
  updateRole(@Param('id') id: string, @Body('role') role: string) {
    return this.usersService.update(+id, { role });
  }

  @Patch(':id/status')
  updateStatus(@Param('id') id: string, @Body('status') status: string) {
    return this.usersService.update(+id, { status });
  }

  @Post('invite')
  inviteUser(@Body() inviteDto: { email: string; role: string }) {
    // In a real app, this would generate a token and send an email.
    // Here, we'll just simulate creating a user placeholder or logging the invite.
    console.log(`Inviting ${inviteDto.email} with role ${inviteDto.role}`);
    return { message: 'Invitation sent successfully (simulated).' };
  }
}
