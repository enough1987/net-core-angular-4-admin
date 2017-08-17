import { Component } from '@angular/core';


import { GiftsService } from "../../index";


@Component({
    templateUrl: './gifts.component.html'
})
export class GiftsComponent {

    resources:any;
    newResource: any = {};
    isAdd: boolean = false;
    removeItem:any;

    constructor(public resourcesService: GiftsService) {
        this.resourcesService.getAll().subscribe((data:any) => {
            this.resources = data;
        });
    }

    setEditMode(resource:any) {
        resource.editMode = true;
    }

    toggleAdd() {
        this.newResource = {};
        this.isAdd = !this.isAdd;
    }

    add() {
        this.resourcesService.add(this.newResource).subscribe((data:any) => {
            this.newResource.errors = false;
            this.resources.push(this.newResource);
            this.toggleAdd();
        }, (err:any) => {
            this.newResource.errors = err;
            console.log(err);
        });
    }

    edit(resource:any) {
        console.log( " resource ", resource );
        this.resourcesService.edit(resource).subscribe((data:any) => {
            resource.editMode = false;
            resource.errors = false;
        }, (err:any) => {
            resource.errors = err;
            console.log(err);
        });
    }

    openRemoveModal(row:any){
        this.removeItem = row;
    }

    cancelRemove() {
        delete this.removeItem;
    }

    remove() {
        console.log( this.removeItem );
        this.resourcesService.remove(this.removeItem.id).subscribe((data:any) => {
            for (var i = this.resources.length - 1; i >= 0; i--) {
                if (this.resources[i].id === this.removeItem.id) {
                    this.resources.splice(i, 1);
                }
            }
            delete this.removeItem;
        }, (err:any) => {
            console.log(err);
        });

    }


}