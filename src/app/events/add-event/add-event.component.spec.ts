import { AddEventComponent } from "./add-event.component";
import { TestBed } from "@angular/core/testing";
import { FormsModule, ReactiveFormsModule, FormBuilder, AbstractControl } from "@angular/forms";
import { EventsService } from "../shared/events.service";
import { NO_ERRORS_SCHEMA } from "@angular/core";
import { Location } from "@angular/common";
import { Router } from "@angular/router";
import { GlobalService } from "../../core/global.service";

describe('AddEventComponent', () => {
    interface ISuite {
        component: AddEventComponent;
        event: any;
        testControl: any;
        eventsService: jasmine.SpyObj<EventsService>;
        globalService: jasmine.SpyObj<GlobalService>;
        router: any;
        formBuilder: any;
        location: Location
    }

    let suite: ISuite = <any> {};
    let EventsServiceMock = jasmine.createSpyObj(['getEventsByDate', 'addEvent']);
    let RouterMock = jasmine.createSpyObj(['navigate','navigateByUrl']);
    let FormBuilderMock = jasmine.createSpyObj(['group']);
    let GlobalServiceMock = jasmine.createSpyObj(['getUser']);
    let location: Location;

    beforeEach(() => {
        TestBed.configureTestingModule({
            declarations: [ AddEventComponent ],
            schemas: [ NO_ERRORS_SCHEMA],
            providers: [
                { provide: EventsService, useValue: EventsServiceMock },
                { provide: Router, useValue: RouterMock},
                { provide: FormBuilder, useValue: FormBuilderMock},
                { provide: GlobalService, useValue: GlobalServiceMock}

            ]
        }).compileComponents(); 
    
        suite.router = TestBed.get(Router);
        suite.formBuilder = TestBed.get(FormBuilder);
        suite.eventsService = TestBed.get(EventsService);
        suite.component = TestBed.createComponent(AddEventComponent).componentInstance;
        suite.event = {
            title: 'Test Title',
            dateGroup: {
                dtStart: new Date(),
                dtEnd: new Date().setDate(new Date().getDate() + 2 ),
            },
            description: 'Test Description',
            capacity: '100',
        }
    })

    afterAll(() => {
        suite = null;
    })

    it('should be created', () => {
        expect(suite.component).toBeTruthy();
    })
    
    it('should call isNumber and return true', () => {
        suite.testControl = { value: 'incorrect'};

        expect(suite.component.isNumber(suite.testControl)).toEqual({notANumber: true})
    })

    it('should call isNumber and return null', () => {
        suite.testControl = { value: '100'};

        expect(suite.component.isNumber(suite.testControl)).toBeNull()
    })
    
})