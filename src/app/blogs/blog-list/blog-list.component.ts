import {Component, OnInit, ChangeDetectorRef, OnDestroy} from '@angular/core';
import { SidebarService } from '../../services/sidebar.service';
import {Subscription} from 'rxjs';
import {Feed} from '../../models/feed';
import {FeedService} from '../../services/feed.service';
import {DevoirService} from '../../services/devoir.service';
import {Devoir} from '../../models/devoir';
import {User} from '../../models/user';
import {FormBuilder, FormGroup, NG_VALUE_ACCESSOR, Validators} from '@angular/forms';
import {FileUploadComponent} from '../file-upload/file-upload.component';
import { HttpEvent, HttpEventType, HttpResponse } from '@angular/common/http';
import { pipe } from 'rxjs';
import { filter, map, tap } from 'rxjs/operators';
import {requiredFileType} from '../../../shared/requiredfiletype';

export function uploadProgress<T>( cb: ( progress: number ) => void ) {
	return tap(( event: HttpEvent<T> ) => {
		if ( event.type === HttpEventType.UploadProgress ) {
			cb(Math.round((100 * event.loaded) / event.total));
		}
	});
}

export function toResponseBody<T>() {
	return pipe(
		filter(( event: HttpEvent<T> ) => event.type === HttpEventType.Response),
		map(( res: HttpResponse<T> ) => res.body)
	);
}
@Component({
	selector: 'app-blog-list',
	templateUrl: './blog-list.component.html',
	styleUrls: ['./blog-list.component.css'],
	providers: [{
		provide: NG_VALUE_ACCESSOR,
		useExisting: FileUploadComponent,
		multi: true
	}]
})
export class BlogListComponent implements OnInit, OnDestroy {
	progress = 0;
	success = false;
	loading = true;
	feeds: Feed[] = [];
	devoirs: Devoir[] = [];
	slug: string;
	feedForm: FormGroup;
	feedSubscription: Subscription;
	devoirSubscription: Subscription;
	public sidebarVisible = false;

	constructor(private sidebarService: SidebarService,
				private cdr: ChangeDetectorRef,
				private formBuilder: FormBuilder,
				private feedService: FeedService,
				private devoirService: DevoirService) {}

	ngOnInit() {
		this.feedService.getFeedsFromServer();
		this.devoirService.getDevoirsFromServer();
		this.feedSubscription = this.feedService.feedsSubject.subscribe(
			(feeds: Feed[] ) => {
				this.feeds = feeds;
			}
		);
		this.devoirSubscription = this.devoirService.devoirsSubject.subscribe(
			(devoirs: Devoir[] ) => {
				this.devoirs = devoirs.slice(0, 3);
			}
		);
		this.feedService.emitFeeds();
		this.devoirService.emitDevoirs();
		if (this.getRole() === 'ROLE_PROFESSEUR') {
			this.initFeedForm();
		}
		this.loading = false;
	}

	toggleFullWidth() {
		this.sidebarService.toggle();
		this.sidebarVisible = this.sidebarService.getStatus();
		this.cdr.detectChanges();
	}

	ngOnDestroy(): void {
		this.feedSubscription.unsubscribe();
	}
	getDate(x: string): Date {
		return new Date(x);
	}
	getDayName(x: number): string {
		const weekdays = new Array(7);
		weekdays[0] = 'Dimanche';
		weekdays[1] = 'Lundi';
		weekdays[2] = 'Mardi';
		weekdays[3] = 'Mercredi';
		weekdays[4] = 'Jeudi';
		weekdays[5] = 'Vendredi';
		weekdays[6] = 'Samedi';
		return weekdays[x];
	}
	getMonthName(x: number): string {
		const yearmonths = new Array(12);
		yearmonths[0] = 'Janvier';
		yearmonths[1] = 'Fevrier';
		yearmonths[2] = 'Mars';
		yearmonths[3] = 'Avril';
		yearmonths[4] = 'Mai';
		yearmonths[5] = 'Juin';
		yearmonths[6] = 'Juillet';
		yearmonths[7] = 'Aout';
		yearmonths[8] = 'Septembre';
		yearmonths[9] = 'Octobre';
		yearmonths[10] = 'Novembre';
		yearmonths[11] = 'Decembre';
		return yearmonths[x];
	}
	devoirDate() {
		const groups = this.devoirs.reduce(( groups2, devoir) => {
			const date = devoir.date.substring(0, 10);
			if (!groups2[date]) {
				groups2[date] = [];
			}
			groups2[date].push(devoir);
			return groups2;
		}, {});
		const groupArrays = Object.keys(groups).map((date) => {
			return {
				date,
				devoirs: groups[date]
			};
		});
		return groupArrays;
	}

	ago(value: string): string {
		const d = new Date(value);
		const now = new Date();
		now.setHours(now.getHours() - 1 );
		const seconds = Math.round(Math.abs((now.getTime() - d.getTime()) / 1000));
		const minutes = Math.round(Math.abs(seconds / 60));
		const hours = Math.round(Math.abs(minutes / 60));
		const days = Math.round(Math.abs(hours / 24));
		const months = Math.round(Math.abs(days / 30.416));
		const years = Math.round(Math.abs(days / 365));
		if (Number.isNaN(seconds)) {
			return '';
		} else if (seconds <= 45) {
			return 'il y a quelques secondes';
		} else if (seconds <= 90) {
			return 'il y a une minute ';
		} else if (minutes <= 45) {
			return 'il y a ' + minutes + ' minutes';
		} else if (minutes <= 90) {
			return 'il y a une heure ';
		} else if (hours <= 22) {
			return 'il y a ' + hours + ' heures';
		} else if (hours <= 36) {
			return 'il y a un jour';
		} else if (days <= 25) {
			return 'il y a ' + days + ' jours';
		} else if (days <= 45) {
			return 'il y a un mois';
		} else if (days <= 345) {
			return 'il y a ' + months + ' mois';
		} else if (days <= 545) {
			return 'il y a un an';
		} else { // (days > 545)
			return 'il y a ' + years + ' ans';
		}
	}

	getImage(user: User): string {
		if (user) {
			if (user.image) {
				if (user.role === 'ROLE_PROFESSEUR') {
					return 'http://gestionscolarite.com/images/professeurs/' + user.image;
				}
			}
			if (user.gendre === 'male') {
				return 'http://gestionscolarite.com/assets/dist/img/avatar5.png';
			} else {
				return 'http://gestionscolarite.com/assets/dist/img/avatar2.png';
			}
		}
		return '';
	}
	getRole(): string {
		return localStorage.getItem('role');
	}

	initFeedForm() {
		this.feedForm = this.formBuilder.group(
			{
				contenu: ['', [Validators.required, Validators.minLength(10)]],
				titre: ['', [Validators.required, Validators.minLength(5)]],
				image: [null, [requiredFileType(['png', 'jpg'])]]
			}
		);
	}

	onFeedSubmit(feed) {
		feed.slug = this.slug;
		feed.type = 'public';
		feed.image = this.feedForm.get('image').value;
		feed.users = [];
		feed.classes = [];
		this.success = false;
		this.feedService.addFeed(feed).pipe(
			uploadProgress(progress => (this.progress = progress)),
			toResponseBody()
		).subscribe(res => {
			this.progress = 0;
			this.feeds.unshift(res['feed']);
			this.success = true;
			this.initFeedForm();
		});
	}

	genslug() {
		const feedTitle = this.feedForm.get('titre').value.toLowerCase();
		this.slug = feedTitle.replace(/[^a-z0-9\s]/gi, '').replace(/[_\s]/g, '-').toLowerCase();
	}



}
