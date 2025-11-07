-- AddPasswordResetFields
ALTER TABLE "users" ADD COLUMN "resetPasswordToken" TEXT;
ALTER TABLE "users" ADD COLUMN "resetPasswordExpiry" TIMESTAMP(3);
