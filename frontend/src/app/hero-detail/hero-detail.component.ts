import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { Hero } from '../hero';
import { Pet } from '../pet';
import { HeroService } from '../hero.service';
import { PetService } from '../pet.service';

@Component({
  selector: 'app-hero-detail',
  templateUrl: './hero-detail.component.html',
  styleUrls: [ './hero-detail.component.css' ]
})


export class HeroDetailComponent implements OnInit {
  hero: Hero;
  pets: Pet[] = [];
  pet: Pet;

  constructor(
    private route: ActivatedRoute,
    private heroService: HeroService,
    private location: Location,
    private petService: PetService,
  ) {}

  ngOnInit(): void {
    this.getHero();
    this.getPets();
  }

  getHero(): void {
    const id: string = this.route.snapshot.params.id;
    this.heroService.getHero(id)
      .subscribe(hero => this.hero = hero);
  }


  goBack(): void {
    this.location.back();
  }

  save(): void {
    this.heroService.updateHero(this.hero)
      .subscribe(() => this.goBack());
  }

  getPets(): void {
    this.petService.getPets()
    .subscribe(pets => this.pets = pets);
  }

  addPet(pet: Pet): void {
    if(!pet){return;}
    this.hero.pet=pet.pet;
    console.log(this.hero.pet);
    this.heroService.updateHero(this.hero)
    .subscribe(hero => this.hero=hero);
  }


  processPhotoFile() {
    const file = (event.target as HTMLInputElement).files[0];
    const Reader=new FileReader();
    Reader.readAsDataURL(file);
    Reader.onload = () => {
      this.hero.photo = Reader.result as string;
      this.heroService.updateHero(this.hero).subscribe(() => this.goBack());
      }
      
  }



}
