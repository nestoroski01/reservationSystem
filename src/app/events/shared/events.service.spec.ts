import { TestBed, inject } from '@angular/core/testing';

import { EventsService } from './events.service';
import { AngularFireDatabase } from 'angularfire2/database';
import { GlobalService } from '../../core/global.service';
import { of } from 'rxjs';

describe('EventsService', () => {
    interface ISuite {
        globalService: jasmine.SpyObj<GlobalService>;
        angularFireDatabase: jasmine.SpyObj<AngularFireDatabase>;
        eventsService: EventsService;
        user: any;
        event: any;
        testDate: Date;
    }

    let suite: ISuite = <any>{};
    let angularFireDatabaseMock = jasmine.createSpyObj(['list']);
    let globalServiceMock = jasmine.createSpyObj(['getUser']);

    beforeEach(() => {
        TestBed.configureTestingModule({
            providers: [
                EventsService,
                { provide: AngularFireDatabase, useValue: angularFireDatabaseMock },
                { provide: GlobalService, useValue: globalServiceMock },
            ]
        });

        suite.globalService = TestBed.get(GlobalService);
        suite.eventsService = TestBed.get(EventsService);
        suite.angularFireDatabase = TestBed.get(AngularFireDatabase);
        suite.user = {
            email: "test@test",
            firstName: "Test",
            lastName: "Test",
            password: "Test",
            telephone: "1234567890",
        };
        suite.event = {
            capacity: "100",
            description: "Test Description Test Test Test Test",
            dtEnd: "Fri Sep 21 2018 10:33:56 GMT+0200 (Central European Summer Time)",
            dtStart: "Fri Sep 14 2018 10:33:54 GMT+0200 (Central European Summer Time)",
            title: "Test Title",
            userID: "-LKYFQGpHpaH1Oe1wMLe"
        }
        
        suite.testDate = new Date(suite.event.dtStart);

    });

    afterAll(() => {
        suite = null;
    });

    it('should be created', () => {
        expect(suite.eventsService).toBeTruthy();
    })

    it('should call addEvent() and push object', () => {
        //arrange & act
        suite.eventsService.addEvent(suite.event);
        //assert
        expect(suite.angularFireDatabase.list).toHaveBeenCalledWith(suite.eventsService.url);
    })

    it('should call getEventsByDate()', () => {
        //act
        suite.eventsService.getEventsByDate(suite.testDate);
        //assert
        expect(suite.angularFireDatabase.list).toHaveBeenCalledWith(suite.eventsService.url);
    })




});
