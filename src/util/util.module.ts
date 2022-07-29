import { Module } from '@nestjs/common';
import { FilesystemService } from '@/util/filesystem/filesystem.service';

@Module({
    providers: [
        FilesystemService
    ],
    exports: [
        FilesystemService
    ]
})
export class UtilModule {}
