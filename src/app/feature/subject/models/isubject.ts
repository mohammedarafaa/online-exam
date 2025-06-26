export interface IAllSubjectRes {
  message:  string;
  metadata: Metadata;
  subjects: Isubject[];
}

export interface Metadata {
  currentPage:   number;
  numberOfPages: number;
  limit:         number;
}

export interface Isubject {
  _id:       string;
  name:      string;
  icon:      string;
  createdAt: Date;
}
