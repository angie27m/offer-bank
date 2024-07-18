import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { ExperienceModel, PostulationModel, VacantModel, VacantSkillModel } from 'src/app/models/recruiting.model';
import { AlertMessageService } from 'src/app/services/alert-message/alert-message.service';
import { OffersService } from 'src/app/services/offers/offers.service';
import { LabelService } from 'src/app/services/translate/translate.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-offer-detail',
  templateUrl: './offer-detail.component.html',
  styleUrls: ['./offer-detail.component.scss']
})
export class OfferDetailComponent implements OnInit {

  /** Determina si se muestra el spinner de carga */
  loadData = true;
  /** ID de la vacante a consultar */
  vacantId!: string | null;
  /** Contiene los datos de la vacante */
  vacant!: VacantModel;
  /** formulario para postularse a la vacante */
  postulationForm: FormGroup;
  /** Contiene el formulari de items extra que necesitan respuesta */
  itemsFormArray: FormArray;
  /** Listado de opciones para el campo experiencia */
  experiences: ExperienceModel[] = [
    {
      label: 'recruiting.less_than_2_years',
      value: 'LESS_THAN_2_YEARS'
    },
    {
      label: 'recruiting.from_2_to_6_years',
      value: 'FROM_2_TO_6_YEARS'
    },
    {
      label: 'recruiting.over_6_years',
      value: 'OVER_6_YEARS'
    }
  ];
  /** Listado de opciones para el campo genero */
  genders: any[] = [
    {
      label: 'recruiting.female',
      value: 'F'
    },
    {
      label: 'recruiting.male',
      value: 'M'
    },
    {
      label: 'recruiting.other_gender',
      value: 'O'
    }
  ];
  /** Listado de opciones para el campo plataforma */
  platforms: any[] = [];
  /** Lista de skills seleccionados */
  selectedSkills: string[] = [];
  /** Lista de experiencias */
  candidateExperiences: string[] = [];
  /** Formulario para crear campo de experiencia */
  experienceForm: FormGroup;
  /** Fecha mínima */
  maxDate: Date = new Date();
  /** Indica si aceptaron la politica de tratamiento de datos */
  politicsAccepted = true;
  /** Expresion regular para validar un email */
  mailRegExp = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  /** Expresion regular para validar un numero */
  numberRegExp = /^[0-9]+$/;
  /** Formulario para subida de foto */
  attachmentFG: FormGroup;
  /** Lista de archivos permitidos para foto */
  listAllowedFiles = ['.jpeg', '.jpg', '.png', '.gif', '.GIF', '.JPEG', '.JPG', '.PNG'];
  /** Indica si se esta guardando la postulación */
  savingData = false;
  /** Indica si se envió la postulación */
  postulationSended = false;
  /** Indica si se CERRO la postulación */
  postulationClosed = false;
  /** Formulario para subida de anexos de hoja de vida*/
  attachmentAppendixFG: FormGroup;
  /** Listado de extensiones permitidas */
  listAllowedFilesAppendix = [
    '.jpeg', '.jpg', '.png', '.pdf', '.xls', '.xlsx', '.doc', '.docx', '.zip', '.rar',
    '.JPEG', '.JPG', '.PNG', '.PDF', '.XLS', '.XLSX', '.DOC', '.DOCX', '.ZIP', '.RAR'
  ];
  environmentUrl: String = environment.flexUrl;

  constructor(
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private offersService: OffersService,
    private translateService: TranslateService,
    private labelService: LabelService,
    private alertMessageService: AlertMessageService
  ) {
    /** Inicializa el formulario de postulaciones */
    this.postulationForm = this.formBuilder.group({
      name: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(100), this.noWhitespaceValidator]],
      mobile: ['', [Validators.required, Validators.pattern(this.numberRegExp), Validators.minLength(7), Validators.maxLength(20)]],
      email: ['', [Validators.required, Validators.maxLength(100), Validators.pattern(this.mailRegExp)]],
      profession: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(100), this.noWhitespaceValidator]],
      education: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(1000), this.noWhitespaceValidator]],
      gender: ['', [Validators.required]],
      platform: ['', [Validators.required]],
      other_platform_description: [''],
      link:[''],
      birthDate: ['', [Validators.required]]
    });
    /** Inicializa el formulario de nueva experiencia */
    this.experienceForm = this.formBuilder.group({
      quantity: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(50)]],
      title: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(100), this.noWhitespaceValidator]],
      description: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(500), this.noWhitespaceValidator]],
    });
    /** Se inicializa formulario de campos extra*/
    this.itemsFormArray = this.formBuilder.array([]);
    /** Se inicializa el formulario de attaachment */
    this.attachmentFG = this.formBuilder.group({
      attachment: [null],
      vacant: ['']
    });

    this.attachmentAppendixFG = this.formBuilder.group({
      attachmentAppendix: [null],
      vacant: ['']
    });
  }

  ngOnInit(): void {
    this.route.queryParams.subscribe( params => {
      this.vacantId = params.vid;
    })
    // si existe el parametro de id de la vacante
    if (this.vacantId) {
      /** Obtiene los datos de la vacante */
      this.offersService.getVacantById(this.vacantId).subscribe( data => {
        this.vacant = data;
        this.loadData = false;
        // si encontro datos de vacante
        if (this.vacant) {
          // asigna el id de la vacante
          this.attachmentFG.get('vacant')?.setValue(this.vacant.id);
          if (this.vacant.stateVacant == 'CLOSED') {
            this.postulationClosed = true;
          }
          // obtiene las opciones de plataforma para ¿de donde se entero d ela oferta?
          this.getPlatforms();
          // asigna el color por default de la empresa
          this.setCompanyColor();
          // cambia el idioma por default al de la empresa
          this.vacant.language ? this.translateService.setDefaultLang(this.vacant.language) : this.translateService.setDefaultLang(this.vacant.company.language);
          // agrega todos los campos extra que necesitan respuesta al formulario de items
          if (this.vacant.items && this.vacant.items.length > 0) {
            this.addExtraItems();
          }
        }
      }, error => {
        this.loadData = false;
        console.error(error);
      });
    } else {
      this.loadData = false;
    }
  }

  /** obtiene las opciones de plataforma para ¿donde se entero de la oferta? */
  getPlatforms() {
    this.offersService.getPlatforms().subscribe( data => {
      this.platforms = data;
    }, error => {
      console.error(error);
    });
  }

  /** Consulta la configuración de la empresa y asigna el color pr default */
  setCompanyColor(): void {
    this.offersService.getCompanyConfiguration(this.vacant.company.id).subscribe( data => {
      document.documentElement.style.setProperty('--primary', String(data.company.theme.colors[0].value));
    }, error => {
      console.error(error);
    });
  }

  /** Agrega una experiencia */
  addExperience(): void {
    const value = this.experienceForm.value;
    const newExperience = `${this.labelService.getTranslate(value.quantity)} - ${value.title} - ${value.description}`;
    this.candidateExperiences.push(newExperience);
    this.experienceForm.reset({
      quantity: '',
      title: '',
      description: ''
    });
  }

  /** Selecciona o deselecciona una habilidad */
  selectSkill(skill: VacantSkillModel): void {
    // valida si el skill ya fue seleccionado
    const selectedIndex = this.selectedSkills.findIndex( selected => {
      return selected === skill.skill.name;
    });
    // agrega o elimina el skill
    if (selectedIndex >= 0) {
      this.selectedSkills.splice(selectedIndex, 1);
    } else {
      this.selectedSkills.push(skill.skill.name);
    }
  }

  /** Valida si un skill esta seleccionado */
  validateSkill(skill: VacantSkillModel): boolean {
    const selectedIndex = this.selectedSkills.find( selected => {
      return selected === skill.skill.name;
    });
    // retorna el valor
    if (selectedIndex) {
      return true;
    }
    return false;
  }

  /** Valida si se debe volver requerido el campo de descripción de otra plataforma */
  validatePlatform() {
    if (this.postulationForm.get('platform')?.value === 'recruiting.other') {
      this.postulationForm.get('other_platform_description')?.setValidators([Validators.required, Validators.maxLength(50), this.noWhitespaceValidator]);
    } else {
      this.postulationForm.get('other_platform_description')?.clearValidators();
      this.postulationForm.get('other_platform_description')?.updateValueAndValidity();
    }
  }

  /** agrega todos los campos extra que necesitan respuesta al formulario de items */
  addExtraItems(): void {
    this.vacant?.items?.map( (item) => {
      if (item.needResponse) {
        let formGroup = this.formBuilder.group({
          id: [item.id, [Validators.required]],
          name: [item.name, [Validators.required]],
          description: [item.description, [Validators.required]],
          response: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(500), this.noWhitespaceValidator]]
        });
        this.itemsFormArray.push(formGroup);
      }
    })
  }

  /** Parsea un AbstractControl en Formgroup */
  getFormGroup(item: AbstractControl) {
    return item as FormGroup;
  }

  /** Recupera los mensajes de error */
  getErrorMessage(control: AbstractControl | null) {
    // Hace uso de un servicio que se encarga de estadarizar los mensajes de error en todo el sistema
    // Por cada Error en el control (Campo) se genera un mensaje
    for (let propertyName in control?.errors) {
      if (control?.errors.hasOwnProperty(propertyName) && control.touched) { // && control.touched si ya fue manipulado por el usuario
        // Envia el nombre de la propiedad que tiene error y el compoenente para generar el mensaje adecuado
        return OffersService.getTranslatedValidatorErrorMessage(propertyName, this.labelService, control?.errors[propertyName]);
      }
    }
  }

  /** Validador para inicio con espacio en blanco */
  noWhitespaceValidator(control: FormControl) {
    return control.value.startsWith(' ') ? {'noWhiteSpace': true} : null;
  }

  /** Retorna el texto concatenado de las habilidades */
  getSkillsText(): string {
    let skills = '';
    this.vacant?.skills.map( (skill, index) => {
      // primer elemento
      if (index == 0) {
        return skills += skill.skill.name;
      }
      return skills += ` | ${skill.skill.name}`;
    });
    return skills;
  }

  /** Valida que los datos de postulación esten correctos */
  validateForm(): boolean {
    // valida el formulario de postulacion
    if (this.postulationForm.invalid) {
      return true;
    }
    // valida las experiencias
    if (this.candidateExperiences.length < 1 && this.vacant.experience != 'WITHOUT_EXPERIENCE') {
      return true;
    }
    // valida las habilidades
    if (this.selectedSkills.length < 1) {
      return true;
    }
    // valida los items extra
    if (this.itemsFormArray.controls.length > 0 && this.itemsFormArray.invalid) {
      return true;
    }
    // valida la aceptación de terminos
    if (!this.politicsAccepted) {
      return true;
    }
    return false;
  }

  /** Construye un html string list a partir de un array */
  buildHtmlList(items: string[]): string {
    let text = '<ul>';
    items.map( item => {
      text += `<li>${item}</li>`
    });
    text += '</ul>';
    return text;
  }

  /** Envia la postulación */
  sendPostulation(): void {
    // construimos el valor de los items extra
    const extraResponses: any = [];
    this.itemsFormArray.controls.map( item => {
      const itemResponse = {
        response: item.get('response')?.value,
        itemVacant: {
            id: item.get('id')?.value
        }
      }
      extraResponses.push(itemResponse);
    })
    // construimos el objeto a enviar
    const postulation: PostulationModel = {
      candidate: {
        name: this.postulationForm.get('name')?.value,
        email: this.postulationForm.get('email')?.value,
        profession: this.postulationForm.get('profession')?.value,
        phone: this.postulationForm.get('mobile')?.value,
        gender: this.postulationForm.get('gender')?.value,
        attachment: this.attachmentFG.get('attachment')?.value,
        dateBirth: this.postulationForm.get('birthDate')?.value
      },
      vacant: this.vacant,
      stageCompany: null,
      score: 0,
      applicationPlatform: this.labelService.getTranslate(this.postulationForm.get('platform')?.value),
      otherApplicationPlatform: this.postulationForm.get('other_platform_description')?.value,
      educationTraining: this.postulationForm.get('education')?.value,
      experience: this.buildHtmlList(this.candidateExperiences),
      skills: this.buildHtmlList(this.selectedSkills),
      recruitingPostulationStages: null,
      itemResponses: extraResponses,
      postulationState: 'IN_PROCESS',
      attachmentAppendix:this.attachmentAppendixFG.get('attachmentAppendix')?.value,
      linkAppendix:this.postulationForm.get('link')?.value
    }
    // enviamos los datos
    this.savingData = true;
    this.offersService.sendPostulation(this.vacant.company.id, postulation).toPromise().then( response => {
      this.savingData = false;
      if (response.error) {
        this.alertMessageService.addWarningMessage(
          this.labelService.getTranslate('recruiting.postulation_already_sended'), ''
        );
        return;
      }
      this.postulationSended = true;
    }).catch( error => {
      this.alertMessageService.addErrorMessage(
        this.labelService.getTranslate('recruiting.error_sending_postulation'), ''
      );
      this.savingData = false;
    })
  }
 
}
