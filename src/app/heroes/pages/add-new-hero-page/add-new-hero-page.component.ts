import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Hero, Publisher } from '../../interfaces/hero.interface';
import { HeroesService } from '../../services/heroes.service';
import { ActivatedRoute, Router } from '@angular/router';
import { switchMap } from 'rxjs';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatDialog } from '@angular/material/dialog';
import { DialogComponent } from '../../components/dialog/dialog.component';

@Component({
  selector: 'app-add-new-hero-page',
  templateUrl: './add-new-hero-page.component.html',
  styles: ``,
})
export class AddNewHeroPageComponent implements OnInit {
  constructor(
    private heroesService: HeroesService,
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private snackbar: MatSnackBar,
    private dialog: MatDialog
  ) {}
  ngOnInit(): void {
    if (!this.router.url.includes('edit')) return;

    this.activatedRoute.params
      .pipe(switchMap(({ id }) => this.heroesService.getHeroById(id)))
      .subscribe((hero) => {
        if (!hero) return this.router.navigateByUrl('/');

        this.heroForm.reset(hero);
        return;
      });
  }
  public heroForm = new FormGroup({
    id: new FormControl(''),
    superhero: new FormControl('', { nonNullable: true }),
    publisher: new FormControl<Publisher>(Publisher.DCComics),
    alter_ego: new FormControl(''),
    first_appearance: new FormControl(''),
    characters: new FormControl(''),
    alt_img: new FormControl(''),
  });

  public publishers = [
    { id: 'DC Comics', value: 'DC - Comics' },
    { id: 'Marvel Comics', value: 'Marvel - Comics' },
  ];

  get currentHero(): Hero {
    const hero = this.heroForm.value as Hero;
    return hero;
  }

  onSubmit(): void {
    if (this.heroForm.invalid) return;

    if (this.currentHero.id) {
      this.heroesService.updateHero(this.currentHero).subscribe((hero) => {
        // TODO: Mostrar snackbar
        this.showSnackbar(`${hero.superhero} actualizado!`);
        this.router.navigateByUrl('/heroes/list-heroes');
      });
      return;
    }
    this.heroesService.addHero(this.currentHero).subscribe((hero) => {
      // TODO Mostrar snackbar y navegar a /heroes/edit/hero.id
      this.showSnackbar(`${hero.superhero} actualizado!`);
      this.router.navigate(['/heroes/edit', hero.id]);
    });
  }

  onDeleteHero(): void {
    if (!this.currentHero.id) throw Error('Hero id es requerido');

    const dialogRef = this.dialog.open(DialogComponent, {
      data: this.heroForm.value,
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (!result) return;

      this.heroesService.deleteHero(this.currentHero.id)
      .subscribe( wasDeleted => {
        if (wasDeleted){
          this.router.navigateByUrl("/heroes")
        }
      } );
    });
  }

  showSnackbar(message: string): void {
    this.snackbar.open(message, 'cerrar', {
      duration: 2500,
    });
  }
}
