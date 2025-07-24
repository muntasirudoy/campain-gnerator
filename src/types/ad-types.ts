export interface Audience {
  gender: string;
  age_group: number | string; 
}

export interface AdPayload {
  name: string;
  campaign_id: string;
  video_url?: File; 
  audiences: Audience[];
}

export interface Ad {
  id?: number;
  name: string;
  campaign_id: number;
  video_url: string;
  audiences: Audience[];
  created_at?: string;
}


export interface AdResponse {
  id: number;
  name: string;
  campaign: {
    id: number;
    name: string;
  };
  video_url: string;
  audiences: AudienceResponse[];
  status: Status;
  created_at: string; 
}

export interface AudienceResponse {
  gender: {
    value: string;
    label: string;
  };
  age_group: {
    value: number;
    label: string;
  };
}

export interface Status {
  value: number;
  label: string;
}
