import { Module } from '@nestjs/common';
import { createObserveModule } from '@nestjs/observe';
import { CommunicationModule } from './communication/communication.module';
import { CommunityModule } from './community/community.module';
import { ContactMethodModule } from './contact-method/contact-method.module';
import { PersonModule } from './person/person.module';

export const { ObserveModule, ObserveInstrument } = createObserveModule();

@Module({
  imports: [
    ObserveModule.forRoot({
      appKey: 'YOUR_APP_KEY',
      appSecret: 'YOUR_APP_SECRET',
      serviceId: 'user-management',
    }),
    CommunicationModule,
    PersonModule,
    CommunityModule,
    ContactMethodModule,
  ],
})
export class AppModule {}
