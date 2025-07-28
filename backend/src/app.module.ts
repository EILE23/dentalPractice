import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'path';

import { LecturesModule } from './lectures/lectures.module';
import { FilesModule } from './files/files.module';

@Module({
  imports: [LecturesModule, FilesModule,ServeStaticModule.forRoot({
      rootPath: join(__dirname, '..', 'uploads'),
      serveRoot: '/files/static',
    }),],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
