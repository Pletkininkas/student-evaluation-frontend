import {
  ApplicationRef,
  ComponentFactoryResolver,
  ComponentRef,
  EmbeddedViewRef,
  Injectable,
  Injector,
} from '@angular/core';
import { SpinnerComponent } from '../spinner/spinner.component';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class SpinnerService {
  componentRef: ComponentRef<SpinnerComponent>;
  private activeLoader = false;
  requestCounter: BehaviorSubject<number> = new BehaviorSubject(0);

  constructor(
    private componentFactoryResolver: ComponentFactoryResolver,
    private appRef: ApplicationRef,
    private injector: Injector,
  ) {
    this.requestCounter.subscribe((value) => {
      if (value > 0 && !this.activeLoader) {
        this.show();
      } else {
        this.hide();
      }
    });
  }

  fetchingStatusChanged(input: boolean): void {
    const counter = input ? 1 : -1;
    this.requestCounter.next(this.requestCounter.getValue() + counter);
  }

  hide() {
    if (this.componentRef) {
      this.appRef.detachView(this.componentRef.hostView);
      this.componentRef.destroy();
      this.activeLoader = false;
    }
  }

  show() {
    this.activeLoader = true;

    this.componentRef = this.componentFactoryResolver.resolveComponentFactory(SpinnerComponent).create(this.injector);

    this.appRef.attachView(this.componentRef.hostView);

    const domElem = (this.componentRef.hostView as EmbeddedViewRef<any>).rootNodes[0] as HTMLElement;

    document.body.appendChild(domElem);
  }
}
