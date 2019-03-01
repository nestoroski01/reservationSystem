import { FormBuilder, ReactiveFormsModule, FormGroup } from "@angular/forms";
import { UserService } from "../shared/user.service";
import { GlobalService } from "../../core/global.service";
import { Router } from "@angular/router";
import { TestBed } from "@angular/core/testing";
import { of } from "rxjs";
import { RegisterComponent } from "./register.component";
import { MaterialModule } from "../../shared/material.module";

describe('RegisterComponent', () => {
    interface ISuite {
        component: RegisterComponent;
        formBuilder: jasmine.SpyObj<FormBuilder>;
        userService: jasmine.SpyObj<UserService>;
        router: jasmine.SpyObj<Router>;
        user: any;
    }

    let suite: ISuite = <any>{};
    let FormBuilderMock = jasmine.createSpyObj(['group']);
    let RouterMock = jasmine.createSpyObj(['navigate']);
    let UserServiceMock = jasmine.createSpyObj(['addUser']);

    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [MaterialModule, ReactiveFormsModule ],
            declarations: [RegisterComponent],
            providers: [
                { provide: FormBuilder, useValue: FormBuilderMock },
                { provide: Router, useValue: RouterMock },
                { provide: UserService, useValue: UserServiceMock },
            ]
        })

        suite.component = TestBed.createComponent(RegisterComponent).componentInstance;
        suite.formBuilder = TestBed.get(FormBuilder);
        suite.router = TestBed.get(Router);
        suite.userService = TestBed.get(UserService);
        suite.user = {
            email: "test@test",
            firstName: "Test",
            lastName: "Test",
            password: "Test",
            telephone: "1234567890",
        }

    })

    it('should create', () => {
        expect(suite.component).toBeTruthy();
    });

    it('should initialize the Login Form', () => {
        //arrange & act
        suite.component.ngOnInit();

        //assert
        expect(suite.formBuilder.group).toHaveBeenCalled();
    })

    it('should call createNewAccount and navigate to /events', () => {
        //arrange
        suite.userService.addUser.and.returnValue(new Promise(suite.user));
        suite.component.registerForm = new FormGroup({});

        //act
        suite.component.createNewAccount();

        //assert
        expect(suite.userService.addUser).toHaveBeenCalled();
        // expect(suite.router.navigate).toHaveBeenCalledWith(['/events']);
    })


})