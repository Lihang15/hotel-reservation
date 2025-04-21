import { request } from "@umijs/max";


/** 获取项目list  */
export async function reservationList( params:any,options?: Record<string, any>) {
    return request<any>(`/api/reservation`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
      params,
      ...(options || {}),
    });
}



/** 修改预定信息  */
export async function updateReservation( params:any, body: any, options?: Record<string, any>) {
  return request<any>(`/api/reservation/${params._id}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** 创建预定  */
export async function createReservation( body: any, options?: Record<string, any>) {
  return request<any>(`/api/reservation`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}


