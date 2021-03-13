import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';


import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FooterComponent } from '../app/components/footer/footer.component';
import { MainNavComponent } from '../app/components/main-nav/main-nav.component';
import { AngularFireModule } from '@angular/fire';
import { AngularFireAuthModule } from '@angular/fire/auth'
import { environment } from 'src/environments/environment';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatListModule } from '@angular/material/list';
import { MatIconModule } from '@angular/material/icon';
import { FormsModule } from '@angular/forms';
import { MatDialogModule } from '@angular/material/dialog';
import { HttpClientModule } from '@angular/common/http';
import { AngularFirestoreModule } from '@angular/fire/firestore'
import { AngularFireStorageModule } from '@angular/fire/storage';
import { MatInputModule } from '@angular/material/input';
import { MatMenuModule } from '@angular/material/menu';
import { SearchBarComponent } from '../app/components/search-bar/search-bar.component';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { ShareNoteDialogComponent } from './components/main-nav/share-note-dialog/share-note-dialog.component';
import {MatPaginatorModule} from '@angular/material/paginator';
import {MatTooltipModule} from '@angular/material/tooltip';
@NgModule({
  declarations: [
    AppComponent,
    FooterComponent,
    MainNavComponent,
    SearchBarComponent,
    ShareNoteDialogComponent,

  ],
  imports: [
    BrowserAnimationsModule,
    MatSnackBarModule,
    MatToolbarModule,
    MatPaginatorModule,
    MatSidenavModule,
    MatTooltipModule,
    MatListModule,
    MatIconModule,
    MatDialogModule,
    FormsModule,
    HttpClientModule,
    AngularFirestoreModule,
    AngularFireStorageModule,
    MatInputModule,
    MatMenuModule,
    BrowserModule,
    AppRoutingModule,
    AngularFireModule.initializeApp(environment.firebase, 'Memos'),
    AngularFireAuthModule,

  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
