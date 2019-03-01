import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SidemenuComponent } from './sidemenu.component';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { GlobalService } from '../global.service';

describe('SidemenuComponent', () => {
  let component: SidemenuComponent;
  let fixture: ComponentFixture<SidemenuComponent>;

  let globalServiceMock: jasmine.SpyObj<GlobalService>;
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SidemenuComponent ],
      providers: [
        { provide: GlobalService, useValue: globalServiceMock}
      ],
      schemas: [NO_ERRORS_SCHEMA],
      
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SidemenuComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create the sidemenu component', () => {
    expect(component).toBeTruthy();
  });

  it('should toggle showText', () => {
    //arrange
    component.showText = false;

    //act
    component.toggleShowText();

    //assert
    expect(true).toEqual(component.showText);
  })
});
