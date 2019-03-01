import { LoginComponent } from "./login.component";
import { FormBuilder, FormsModule, ReactiveFormsModule, FormGroup } from "@angular/forms";
import { UserService } from "../shared/user.service";
import { GlobalService } from "../../core/global.service";
import { Router } from "@angular/router";
import { TestBed } from "@angular/core/testing";
import { of } from "rxjs";
import { MaterialModule } from "../../shared/material.module";
import { NO_ERRORS_SCHEMA } from "@angular/core";

describe('LoginComponent', () => {
    interface ISuite {
        component: LoginComponent;
        formBuilder: jasmine.SpyObj<FormBuilder>;
        userService: jasmine.SpyObj<UserService>;
        router: jasmine.SpyObj<Router>;
        globalService: jasmine.SpyObj<GlobalService>;
        user: any;
    }

    let suite: ISuite = <any>{};
    let FormBuilderMock = jasmine.createSpyObj(['group']);
    let GlobalServiceMock = jasmine.createSpyObj(['setUser', 'setIsLogged']);
    let RouterMock = jasmine.createSpyObj(['navigate']);
    let UserServiceMock = jasmine.createSpyObj(['loginAuth']);

    beforeEach(() => {
        TestBed.configureTestingModule({
            declarations: [LoginComponent],
            imports: [MaterialModule, ReactiveFormsModule],
            providers: [
                { provide: FormBuilder, useValue: FormBuilderMock },
                { provide: GlobalService, useValue: GlobalServiceMock },
                { provide: Router, useValue: RouterMock },
                { provide: UserService, useValue: UserServiceMock },
            ],
            schemas: [NO_ERRORS_SCHEMA]
        }).compileComponents();

        suite.formBuilder = TestBed.get(FormBuilder);
        suite.globalService = TestBed.get(GlobalService);
        suite.router = TestBed.get(Router);
        suite.userService = TestBed.get(UserService);
        suite.component = TestBed.createComponent(LoginComponent).componentInstance;
        suite.user = {
            email: "test@test",
            firstName: "Test",
            lastName: "Test",
            password: "Test",
            telephone: "1234567890",
        };
    })

    afterAll(() => {
        suite = null;
    })

    it('should create', () => {
        expect(suite.component).toBeTruthy();
    })

    it('should initialize the Login Form', () => {
        //arrange & act
        suite.component.ngOnInit();

        //assert
        expect(suite.formBuilder.group).toHaveBeenCalled()
    })

    it('should call login and navigate to /events', () => {
        //arrange
        suite.userService.loginAuth.and.returnValue(of([suite.user]));
        suite.component.loginForm = new FormGroup({});
        
        //act
        suite.component.login();

        //assert
        expect(suite.globalService.setUser).toHaveBeenCalledWith(suite.user);
        expect(suite.globalService.setIsLogged).toHaveBeenCalledWith(true);
        expect(suite.router.navigate).toHaveBeenCalledWith(['/events']);
    })


})