import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideRouter, RouterOutlet } from '@angular/router';
import { Home } from './home';

describe('Home', () => {
  let component: Home;
  let fixture: ComponentFixture<Home>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Home, RouterOutlet],
      providers: [provideRouter([])],
    }).compileComponents();

    fixture = TestBed.createComponent(Home);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should render a rotation control for each topic and rotate when selected', () => {
    fixture.detectChanges();

    const controls = fixture.nativeElement.querySelectorAll('.tagcloud-control-button input');
    const topics = fixture.nativeElement.querySelectorAll('.tagcloud-tag');
    expect(controls.length).toBe(component.wordCloudLength);
    expect(topics.length).toBe(component.wordCloudLength);

    controls[0].dispatchEvent(new Event('change'));
    fixture.detectChanges();

    expect(component.currentRotation).toBeCloseTo(54 + 360 / component.wordCloudLength);
    expect(fixture.nativeElement.querySelector('.tagcloud-controls').style.getPropertyValue('--current-rotation')).toContain('deg');
  });
});
