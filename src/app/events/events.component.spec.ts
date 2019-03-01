import { TestBed, inject } from '@angular/core/testing';
import { EventsComponent } from './events.component';
import { NO_ERRORS_SCHEMA } from '@angular/core';


describe('EventsComponent', () => {
    interface ISuite {
        component: EventsComponent,
        user: any,
    }

    let suite: ISuite = <any>{}

    beforeEach(() => {
        TestBed.configureTestingModule({
            declarations: [EventsComponent],
            schemas: [NO_ERRORS_SCHEMA]
        }).compileComponents();

        suite.component = TestBed.createComponent(EventsComponent).componentInstance;
        suite.user = {
            email: "test@test",
            firstName: "Test",
            lastName: "Test",
            password: "Test",
            telephone: "1234567890",
        };
    });

    afterAll(() => {
        suite = null;
    })

    it('should be created', () => {
        expect(suite.component).toBeTruthy();
    })

    it('should initialize the next 7 days.', () => {
        let today = new Date();

        suite.component.ngOnInit();

        expect(suite.component.week.length).toBe(7);
        expect(suite.component.week[0]).toEqual(today)

    })

});