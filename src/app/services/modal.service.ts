import { Injectable } from '@angular/core';

interface IModal{
  id: string;
  visible: boolean;
};

@Injectable({
  providedIn: 'root'
})
export class ModalService {
  //private visible: boolean = false;

  private modals: IModal[] = [];

  constructor() { }

  register(id: string){
    this.modals.push({
      id: id,
      visible: false
    });
  }

  unregister(id: string){
    this.modals.filter(element => element.id !== id);
  }

  isModalOpen(id: string): boolean {
    //console.log(this.modals);
    //return this.visible;
    //return !!this.modals.find(element => element.id == id)?.visible;
    return Boolean(this.modals.find(element => element.id == id)?.visible);
  }

  toggleModal(id: string): void {
    //this.visible = !this.visible;
    const modal = this.modals.find(element => element.id == id);

    if(modal){
      modal.visible = !modal.visible;
    }
  }
}
