import {
  Component,
  inject,
  OnInit,
  signal,
  WritableSignal,
} from '@angular/core';
import { INote } from '../../shared/interfaces/inote';
import {
  ReactiveFormsModule,
  FormControl,
  FormGroup,
  Validators,
  FormsModule,
} from '@angular/forms';
import { NoteService } from '../../core/services/note/note.service';
import { DatePipe } from '@angular/common';
import { ToastrService } from 'ngx-toastr';
import { SearchPipe } from '../../shared/pipes/search/search.pipe';

@Component({
  selector: 'app-home',
  imports: [ReactiveFormsModule, DatePipe, SearchPipe, FormsModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
})
export class HomeComponent implements OnInit {
  constructor(private toastr: ToastrService) {}
  text: string = '';
  notes: WritableSignal<INote[]> = signal([]);
  isModalOpen: WritableSignal<boolean> = signal(false);
  isEditModalOpen = signal(false);
  editingNoteId: string | null = null;
  private readonly noteService = inject(NoteService);
  toggleModal(): void {
    this.isModalOpen.update((open) => {
      const newOpen = !open;
      document.body.style.overflow = newOpen ? 'hidden' : '';
      return newOpen;
    });
  }
  closeModal(event?: MouseEvent): void {
    if (
      !event ||
      (event.target as HTMLElement).classList.contains('backdrop-blur-sm')
    ) {
      this.toggleModal();
    }
  }
  openEditModal(note: INote) {
    this.editingNoteId = note._id;
    this.updateNoteForm.patchValue(note);
    this.isEditModalOpen.set(true);
  }
  closeEditModal() {
    this.isEditModalOpen.set(false);
    this.editingNoteId = null;
  }
  ngOnInit(): void {
    this.getNotes();
  }
  addNoteForm: FormGroup = new FormGroup({
    title: new FormControl(null, [Validators.required]),
    content: new FormControl(null, [Validators.required]),
  });
  updateNoteForm: FormGroup = new FormGroup({
    title: new FormControl(null, [Validators.required]),
    content: new FormControl(null, [Validators.required]),
  });
  addNotes() {
    if (this.addNoteForm.valid) {
      this.noteService.addNote(this.addNoteForm.value).subscribe({
        next: (res) => {
          this.getNotes();
          this.addNoteForm.reset();
          this.closeModal();
          this.toastr.success(
            'Note added successfully! Feel free to add more or edit this one anytime.',
            'Notely'
          );
        },
        error: (err) => {
          console.log(err);
        },
      });
    } else {
      this.addNoteForm.markAllAsTouched();
    }
  }
  getNotes() {
    this.noteService.getNotes().subscribe({
      next: (res) => {
        this.notes.set(res.notes);
      },
      error: (err) => {
        this.notes.set([]);
      },
    });
  }
  deleteNote(id: string) {
    this.noteService.deleteNote(id).subscribe({
      next: () => {
        this.getNotes();
        this.toastr.info('Your note has been successfully deleted.', 'Notely');
      },
    });
  }
  updateNote() {
    if (this.updateNoteForm.valid) {
      this.noteService
        .updateNote(this.updateNoteForm.value, this.editingNoteId!)
        .subscribe({
          next: () => {
            this.getNotes();
            this.closeEditModal();
            this.toastr.success(
              'Note updated successfully! Your changes have been saved.',
              'Notely'
            );
          },
        });
    } else {
      this.updateNoteForm.markAllAsTouched();
    }
  }
}
