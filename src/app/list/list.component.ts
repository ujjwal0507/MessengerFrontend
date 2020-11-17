import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Contact } from './contact';
import { ListService } from './list.service';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css']
})
export class ListComponent implements OnInit {

  private _filterBy: string;
  get filterBy(){
    return this._filterBy;
  }
  set filterBy(value: string){
    this._filterBy = value;
    this.filteredContactList = this.filterBy?this.performFilter(this.filterBy): this.contactList;
  }
  contactList: Contact[];
  filteredContactList: Contact[];

  constructor(private route: Router, private listService: ListService) { }

  ngOnInit(): void {
    this.listService.getContacts().subscribe({
      next:contacts=>{
        this.contactList = contacts;
        this.filteredContactList = this.contactList;
      }
    });
  }

  performFilter(filterValue: string): Contact[]{
    filterValue = filterValue.toLowerCase();
    return this.contactList.filter((contact: Contact) => contact.contactName.toLowerCase().indexOf(filterValue)!==-1);
  }

  onContactClick(id: number): void{
    this.route.navigate(['/chat', id]);
  }
}
