export interface IPersonalInfo {
  fullName: string;
  phoneNumber: string;
  emailAddress: string;
  bvn: string;
  gender: string;
  maritalStatus: string;
  children: string;
  typeOfResidence: string;
}

export interface IEducationEmployment {
  levelOfEducation: string;
  employmentStatus: string;
  sectorOfEmployment: string;
  durationOfEmployment: string;
  officeEmail: string;
  monthlyIncome: string;
  loanRepayment: string;
}

export interface ISocials {
  twitter: string;
  facebook: string;
  instagram: string;
}

export interface IGuarantor {
  fullName: string;
  phoneNumber: string;
  emailAddress: string;
  relationship: string;
}

export interface IUser {
  id: string | number;
  organization: string;
  username: string;
  email: string;
  phone: string;
  createdAt: string;
  status: "Active" | "Inactive" | "Pending" | "Blacklisted";

  // Detailed fields
  accountNumber: string;
  accountBalance: string;
  bankName: string;

  personalInfo: IPersonalInfo;
  educationEmployment: IEducationEmployment;
  socials: ISocials;
  guarantor: IGuarantor;

  profileImage?: string; // optional
}
