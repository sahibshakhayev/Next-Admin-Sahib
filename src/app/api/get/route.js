import { NextResponse } from 'next/server';
import axios from 'axios';
import queryString from 'query-string';

 import { API_BASE_URL} from "../../../providers/config";


 let APILink = API_BASE_URL + '/api'

export async function POST(request) {
  const { resource, params } = await request.json();

  console.log(resource);

  try {
    let url = '';
    const query = {};

    // Определяем логику для каждого ресурса
    switch (resource) {
      case 'settings':
        url = `${APILink}/settings`;
        break;

      case 'products': {
        const { page, perPage } = params.pagination;
        const { field, order } = params.sort;

        Object.assign(query, {
          _sort: field,
          _order: order,
          _page: page,
          _limit: perPage,
          ...params.filter,
        });

        url = `${APILink}/products?${queryString.stringify(query)}`;
        break;
      }

      case 'categories':
      case 'subcategories':
        url = `${APILink}/${resource}?${queryString.stringify(params.filter)}`;
        break;

      case 'languages':
      case 'translations': {
        const { page, perPage } = params.pagination;
        const { field, order } = params.sort;

        Object.assign(query, {
          sort: field,
          order,
          page,
          per_page: perPage,
          ...params.filter,
        });

        url = `${APILink}/${resource}?${queryString.stringify(query)}`;
        break;
      }

      case 'services': {
        const { page, perPage } = params.pagination;
        const { field, order } = params.sort;
        const search = params.filter.search || '';

        url = `${APILink}/services?page=${page}&perPage=${perPage}&_sort=${field}&_order=${order}&search=${search}`;
        break;
      }

      case 'partners':
        url = `${APILink}/partners`;
        break;

      case 'projects': {
        const { page, perPage } = params.pagination;
        const { field, order } = params.sort;
        const search = params.filter.search || '';

        url = `${APILink}/projects?page=${page}&perPage=${perPage}&_sort=${field}&_order=${order}&search=${search}`;
        break;
      }

      case 'brandvalues':
      case 'subbrands': {
        const { page, perPage } = params.pagination;
        const { field, order } = params.sort;

        Object.assign(query, {
          sort: field,
          order,
          page,
          per_page: perPage,
          ...params.filter,
        });

        url = `${APILink}/about-us`;
        break;
      }

      case 'about-us':
        url = `${APILink}/about-us`;
        break;

      case 'contactings':
        url = `${APILink}/contactings/contact`;
        break;

      case 'blogs': {
        const { page, perPage } = params.pagination;
        const { field, order } = params.sort;

        Object.assign(query, {
          sort: field,
          order,
          page,
          per_page: perPage,
          ...params.filter,
        });

        url = `${APILink}/blogs?${queryString.stringify(query)}`;
        break;
      }

      case 'pages':
        url = `${APILink}/static/pages`;
        break;

      case 'statictexts': {
        url = `${APILink}/static/texts?${queryString.stringify(params.filter)}`;
        break;
      }

      default:
        throw new Error(`Resource ${resource} is not supported`);
    }

    // Запрос к серверу
    const response = await axios.get(url);
    const data = response.data;

    console.log(resource);

   
    return NextResponse.json({
      data: data.data || data, 
      total: data.total || data.length || 1,
    });
  } catch (error) {
    const status = error.response?.status || 500;
    const message = error.response?.data?.message || 'Something went wrong';
    return NextResponse.json({ message }, { status });
  }
}
