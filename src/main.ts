import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const config=new DocumentBuilder().setTitle('Report API')
  .setDescription('The Report API description')
  .setVersion('1.0').build(); 
  const documentFactor=()=>SwaggerModule.createDocument(app,config);
SwaggerModule.setup('api',app,documentFactor());
await app.listen(process.env.PORT ?? 3001);
console.log(`Swagger API documentation available at http://localhost:${process.env.PORT ?? 3000}/api`);

} 
bootstrap();
