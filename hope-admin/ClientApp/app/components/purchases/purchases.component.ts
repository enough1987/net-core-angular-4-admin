import { Component } from '@angular/core';


import { ResourcesService } from "../../index";


@Component({
    templateUrl: './purchases.component.html'
})
export class PurchasesComponent {

    resources:any;
    newResource: any = {};
    isAdd: boolean = false;
    removeItem:any;

    constructor(public resourcesService: ResourcesService) {
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
            delete this.newResource.errors;
            this.resources.push(this.newResource);
            this.toggleAdd();
        }, (err:any) => {
            this.newResource.errors = err;
            console.log(err);
        });
    }

    edit(resource:any) {
        this.resourcesService.edit(resource).subscribe((data:any) => {
            delete resource.errors;
            resource.editMode = false;
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