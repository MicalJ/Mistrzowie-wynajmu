import { Component, OnInit } from '@angular/core';
import { PropertiesService } from '../services/properties.service';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Location } from '@angular/common';
import { Property } from '../../../models/property';

@Component({
    templateUrl: './property-details.component.html'
})

export class PropertyDetailsComponent implements OnInit {
    constructor(private propertiesService: PropertiesService, private activatedRoute: ActivatedRoute, private router: Router, private location: Location) { }

    pageTitle: string;
    urlParam: number;
    isInEditMode: boolean = true;
    property: Property = new Property();
    
    ngOnInit(): void {
        this.detectUrlParam();

        if (this.location.isCurrentPathEqualTo("/properties/new-property")) {
            this.pageTitle = "Nowa nierochomość"
        }
        else if (this.location.isCurrentPathEqualTo("/properties/property-update/" + this.urlParam)) {
            this.pageTitle = "Aktualizacja nieruchomości";
            this.downloadProperty();
        }
        else {
            this.pageTitle = "Szczegóły nieruchomości";
            this.isInEditMode = false;
            this.downloadProperty();
        }
    }

    downloadProperty(): void {
        this.propertiesService.getProperty(this.urlParam)
            .subscribe(propertyFromDb => this.property = propertyFromDb, errorObj => console.log(errorObj));
    }

    onSubmit(propObj: Property): void {
        if (this.location.isCurrentPathEqualTo("/properties/new-property")) {
            propObj.addressId = 2;
            propObj.ownerId =2;
            this.propertiesService.addProperty(propObj)
                .subscribe(onSuccess => { console.log(onSuccess); this.backToProperties(); }, onError => console.log(onError))
        }
        else {
            this.propertiesService.updateProperty(propObj)
                .subscribe(onSuccess => { console.log(onSuccess); this.backToProperties(); }, onError => console.log(onError))
        }
    }

    detectUrlParam(): void {
        this.activatedRoute.params.subscribe((params: Params) => {
            this.urlParam = params['id'];
        });
    }

    backToProperties(): void {
        this.router.navigate(['./properties']);
    }
    
    goBack(): void {
        this.location.back();
    }
}