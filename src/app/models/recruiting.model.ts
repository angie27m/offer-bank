/** Modelo campo experiencia */
export class ExperienceModel {
    label!: string;
    value!: 'WITHOUT_EXPERIENCE' | 'LESS_THAN_2_YEARS' | 'FROM_2_TO_6_YEARS' | 'OVER_6_YEARS';
};

export class JobModel {
    id!: number;
    name!: string;
    divisionId?: number;
    divisionsName?: string[];
    categoriesName?: string[];
}

export class BossModel {
    id!: number;
    name!: string;
    email!: string;
    job!: JobModel;
    division!: DivisionModel;
}

/** Modelo datos empleado */
export class EmployeeModel {
    id!: number;
    name!: string;
    email!: string;
    language!: string;
    job!: JobModel;
    division!: DivisionModel;
    boss!: BossModel;
    collaborators!: EmployeeModel[];
    collaboratorsCount!: number;
    postulationCollaboratorsCount!: number;
    postulatedCollaboratorsJobCount!: number;
    employeeState!: string;
    superBossId?: number;
    countSuperBossSubordinates? : number;
}

/** Modelo de un departamento */
export class DivisionModel {
    id!: number;
    name!: string;
    leaders?:EmployeeModel[];
}

/** Modelo campo habilidades */
export class SkillModel {
    id!: number;
    name!: string;
};

/** Modelo campo habilidades para la BD */
export class VacantSkillModel {
    skill!: SkillModel;
};

/** Modelo campo item adicional */
export class AdittionalItemModel {
    id?: number;
    name!: string;
    description!: string;
    needResponse!: boolean;
};

/** Modelo de paises */
export class CountryModel {
    id!: number;
    name!: string;
    code!: string;
    zone!: string;
}

/** Modelo para los colores de un tema */
export class ColorModel {
    id!: string;
    value!: string;
}

/** Modelo para el tema de una empresa */
export class ThemeModel {
    id!: string;
    colors!: ColorModel[];
}

/** Modelo para los modulos de una empresa */
export class ModuleModel {
    id!: number;
    name!: string;
}

/** Modelo para el nivel de una empresa */
export class CompanyLevelModel {
	id?: number;
    name!: string;
    level?: number;
    value?: number;
}

/** Modelo para el dominio de una empresa */
export class CompanyDomainModel {
    id!: number;
    domain!: string;
    state!: string;
}

/** Modelo para empresas */
export class CompanyModel {
    id!: number;
    name!: string;
    state!: boolean;
    language!: string;
    country!: CountryModel;
    theme!: ThemeModel;
    fromAddress!: string;
    fromName!: string;
    modules!: ModuleModel[];
    subsidiariesCount!: number;
    CompanyLevels?: CompanyLevelModel[];
    confs?:any;
    links!: string[];
    companyDomain?: CompanyDomainModel;
}

/** Modelo para las vacantes */
export class VacantModel {
    id?: number;
    name!: string;
    vacantInternId!: string;
    division!: DivisionModel;
    educationTraining!: string;
    experience!: string;
    descriptionJob!: string;
    specificFunctions!: string;
    stateVacant?: string;
    company!: CompanyModel;
    contractType!: string;
    contractTime!: number;
    type!: string;
    createdDate?: Date;
    skills!: VacantSkillModel[];
    items?: AdittionalItemModel[];
    showCompanyInfo?: boolean;
    language?: string;
}

/** Modelo para los archivos adjuntos */
export class AttachmentModel {
    id!: number;
    state!: string;
    auditable!: Auditable;
    name!: string;
    type!: string;
    url!: string;
    size!: number;
}

export class Auditable {
    createdDate!: Date;
    lastUpdatedDate!: Date;
    lastInactivatedDate!: Date;
    deletedDate!: Date;
}

/** Módelo para etapas de una empresa */
export class StageCompanyModel {
    id!: number;
    company!: CompanyModel;
    name!: string;
    order!: number;
    active!: boolean;
    stage!: StageModel;
};

/** Módelo para etapas génericas */
export class StageModel {
    id!: number;
    name!: string;
    order!: number;
    active!: boolean;
    editable!: boolean;
};

/** Modelo de una postulación a una vacante */
export class PostulationModel {
    applicationPlatform!: string;
    otherApplicationPlatform!: string;
    candidate!: CandidateModel;
    educationTraining!: string;
    experience!: string;
    id?: number;
    itemResponses?: AdittionalItemResponseModel[];
    postulationState!: string;
    recruitingPostulationStages!: RecruitingPostulationStageModel[] | null;
    score!: number;
    skills!: string;
    stageCompany!: StageCompanyModel | null;
    vacant!: VacantModel;
    createdDate?: Date;
    attachmentAppendix?:AttachmentModel;
    linkAppendix!:string;
}

/** Modelo de un candidato */
export class CandidateModel {
    company?: CompanyModel;
    email!: string;
    gender!: string;
    id?: number;
    name!: string;
    attachment?: AttachmentModel;
    phone!: string;
    profession!: string;
    dateBirth!: string;
}

/** Modelo respuesta campo item adicional */
export class AdittionalItemResponseModel {
    id!: number;
    itemVacant!: AdittionalItemModel;
    recruitingPostulation!: PostulationModel;
    response!: string;
};

/** Modelo de una postulación a una vacante */
export class RecruitingPostulationStageModel {
    id?: number;
    score!: number;
    approved!: boolean;
    comment!: string;
    stageCompany!: StageCompanyModel;
    recruitingPostulation!: PostulationModel;
}
