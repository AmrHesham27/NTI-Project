import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AgentPropsComponent } from './agent-props.component';

describe('AgentPropsComponent', () => {
  let component: AgentPropsComponent;
  let fixture: ComponentFixture<AgentPropsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AgentPropsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AgentPropsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
