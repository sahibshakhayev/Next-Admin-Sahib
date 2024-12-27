import { fetchUtils } from 'react-admin';
import simpleRestProvider from 'ra-data-simple-rest';
import queryString from 'query-string';
import {API_BASE_URL} from './config'

import axios from 'axios';

const apiUrl = `${API_BASE_URL}/api/`;

const httpClient = (url, options = {}) => {
    if (!options.headers) {
        options.headers = new Headers({ Accept: 'application/json' });
    }
    const token = localStorage.getItem('access_token');
    if (token) {
        options.headers.set('Authorization', `Bearer ${token}`);
    }
    return fetchUtils.fetchJson(url, options);
};


const myDataProvider = {
    ...simpleRestProvider(apiUrl, httpClient),




    getList: (resource, params) => {
        return axios
          .post('/api/get', { resource, params })
          .then(({ data }) => ({
            data: data.data, // Массив объектов
            total: data.total, // Общее количество записей для пагинации
          }))
          .catch((error) => {
            throw new Error(error.response?.data?.message || 'Failed to fetch data');
          });
      },
      




    // Fetch the single AboutUs entry
    getOne: (resource, params) => {
        if (resource === 'about-us') {
            return httpClient(`${apiUrl}/about-us`)
                .then(({ json }) => ({
                    data: json,  // Assuming API returns a single AboutUs entry
                }));
        }

        if (resource == 'brandvalues' || resource == 'subbrands') {

            console.log(params.id);
            const url = `${apiUrl}/about-us`;
            return httpClient(url).then(({ json }) => {


                return {data: json[resource == 'brandvalues' ? 'brand_values' : resource].find(item => item.id == params.id)}
            });

        }


        if (resource === 'services') {
            return httpClient(`${apiUrl}/services/${params.id}`)
                .then(({ json }) => ({
                    data: json,
                }));
        }

        if (resource === 'projects') {
            return httpClient(`${apiUrl}/projects/${params.id}`)
                .then(({ json }) => ({
                    data: json,
                }));
        }
        if (resource === 'contactings') {
            return httpClient(`${apiUrl}/contactings/contact`)
                .then(({ json }) => {
                    const contact = json.find(item => item.id == params.id);
                    if (!contact) {
                        return Promise.reject(new Error("Setting does not exist"));
                    }
                    return { data: contact };
                });
        }


        if (resource === 'partners') {
            return httpClient(`${apiUrl}/partners`)
                .then(({ json }) => {
                    const partners = json.find(item => item.id == params.id);




                    if (!partners) {
                        return Promise.reject(new Error("Parthners does not exist"));
                    }

                    return { data: partners };
                });
        }

        if (resource === 'blogs') {
            return httpClient(`${apiUrl}/blogs/${params.id}`)
                .then(({ json }) => {
                    return { data: json};
                });
        }

        // Handle for settings resource
        if (resource === 'settings') {
            return httpClient(`${apiUrl}/settings`)
                .then(({ json }) => {
                    const setting = json.data.find(item => item.id == params.id);
                    if (!setting) {
                        return Promise.reject(new Error("Setting does not exist"));
                    }
                    return { data: setting };
                });
        }

        if (resource === 'statictexts') {
            return httpClient(`${apiUrl}/static/text/${params.id}`)
                .then(({ json }) => ({
                    data: json,
                }));
        }


        if (resource === 'pages') {
            return httpClient(`${apiUrl}/static/page/${params.id}`)
                .then(({ json }) => ({
                    data: json,
                }));
        }





        // Fallback to default behavior for other resources
        return simpleRestProvider(apiUrl, httpClient).getOne(resource, params);
    },

    // Update the AboutUs entry, including nested Subbrands and BrandValues
    update: (resource, params) => {
        if (resource === 'about-us') {
            const formData = new FormData();

            // Append AboutUs fields
            formData.append('header_text', params.data.header_text);
            formData.append('short_description', params.data.short_description);
            formData.append('long_description', params.data.long_description || '');
            formData.append('image_alt', params.data.image_alt || '');

            // Handle image upload (if provided)
            if (params.data['left_image'] && params.data['left_image'].rawFile) {
                formData.append('left_image', params.data['left_image'].rawFile);
            }


            // Ensure it's an update request
            formData.append('_method', 'PUT');

            // Send the request
            return httpClient(`${apiUrl}/admin/about-us/${params.id}`, {
                method: 'POST',  // To support file uploads, using POST with PUT method override
                body: formData,
            }).then(({ json }) => ({
                data: json,
            }));
        }




        if (resource === 'products') {
            const formData = new FormData();


            formData.append('title', params.data.title);
            formData.append('description', params.data.description);
            formData.append('subcategory_id', params.data.subcategory_id);
            formData.append('client', params.data.client);
            formData.append('location', params.data.location);
            formData.append('date', params.data.date);

            // Handle image upload (if provided)
            if (params.data['image'] && params.data['image'].rawFile) {
                formData.append('image', params.data['image'].rawFile);
            }


            // Ensure it's an update request
            formData.append('_method', 'PUT');

            // Send the request
            return httpClient(`${apiUrl}/admin/products/${params.id}`, {
                method: 'POST',  // To support file uploads, using POST with PUT method override
                body: formData,
            }).then(({ json }) => ({
                data: json,
            }));
        }

        if (resource === 'brandvalues') {
            const formData = new FormData();

            // Append AboutUs fields
            formData.append('title', params.data.title);
            formData.append('description', params.data.description);

            // Handle image upload (if provided)
            if (params.data.icon && params.data.icon.rawFile) {
                formData.append('icon', params.data.icon.rawFile);
            }


            // Ensure it's an update request
            formData.append('_method', 'PUT');

            // Send the request
            return httpClient(`${apiUrl}/admin/about-us/brandValue/${params.id}`, {
                method: 'POST',  // To support file uploads, using POST with PUT method override
                body: formData,
            }).then(({ json }) => ({
                data: json,
            }));
        }



        if (resource === 'subbrands') {
            const formData = new FormData();

            // Append AboutUs fields
            formData.append('logo_alt', params.data['logo_alt']);


            // Handle image upload (if provided)
            if (params.data.logo && params.data.logo.rawFile) {
                formData.append('logo', params.data.logo.rawFile);
            }


            // Ensure it's an update request
            formData.append('_method', 'PUT');

            // Send the request
            return httpClient(`${apiUrl}/admin/about-us/subbrand/${params.id}`, {
                method: 'POST',  // To support file uploads, using POST with PUT method override
                body: formData,
            }).then(({ json }) => ({
                data: json,
            }));
        }


        if (resource === 'partners') {
            const formData = new FormData();
            formData.append('alt_text', params.data.alt_text);
            formData.append('website_link', params.data.website_link);

            if (params.data.logo && params.data.logo.rawFile) {
                formData.append('logo', params.data.logo.rawFile);  // Handle logo file
            }
            formData.append('_method', 'PUT');


            return httpClient(`${apiUrl}/admin/partners/${params.id}`, {
                method: 'POST',
                body: formData,
            }).then(({ json }) => ({
                data: json,
            }));
        }

        if (resource === 'blogs') {
            const formData = new FormData();
            formData.append('title', params.data.title);
            formData.append('subtitle', params.data.subtitle);
            formData.append('content', params.data.content);

            formData.append('_method', 'PUT');
            if (params.data.image && params.data.image.rawFile) {
                formData.append('image', params.data.image.rawFile); // Ensure the raw file is appended
            }


            if (params.data['article_image'] && params.data['article_image'].rawFile) {
                formData.append('article_image', params.data['article_image'].rawFile); // Ensure the raw file is appended
            }

            return httpClient(`${apiUrl}/admin/blogs/${params.id}`, {
                method: 'POST',
                body: formData, // Send the FormData with the file

            }).then(({ json }) => ({ data: json }));
        }






        if (resource === 'pages') {
            const formData = new FormData();
            formData.append('title', params.data.title);
            formData.append('slug', params.data['slug']);
            formData.append('hero_title', params.data['hero_title']);
            formData.append('link', params.data.link);
            formData.append('hero_description', params.data['hero_description']);
            formData.append('is_active', Number(params.data['is_active']));
            formData.append('_method', 'PUT');
            if (params.data['hero_image'] && params.data['hero_image'].rawFile) {
                formData.append('hero_image', params.data['hero_image'].rawFile); // Ensure the raw file is appended
            }

            return httpClient(`${apiUrl}/admin/page/${params.id}`, {
                method: 'POST',
                body: formData, // Send the FormData with the file

            }).then(({ json }) => ({ data: json.data }));
        }


        if (resource === 'contactings') {
            const formData = new FormData();
            formData.append('name', params.data.name);
            formData.append('mail', params.data.mail);

            if (params.data.image && params.data.image.rawFile) {
                formData.append('image', params.data.image.rawFile);
            }

            formData.append("_method", "PUT");

            return httpClient(`${apiUrl}/admin/contactings/${params.id}`, {
                method: 'POST',
                body: formData,
            }).then(({ json }) => ({
                data: json,
            }));
        }

        // Handle settings resource update
        if (resource === 'settings') {
            return httpClient(`${apiUrl}/admin/settings/${params.id}`, {
                method: 'PUT',
                body: JSON.stringify(params.data),
            }).then(({ json }) => ({ data: json }));
        }


        if (resource === 'categories') {

            const formData = new FormData();


            formData.append('name', params.data.name);


            // Handle image upload (if provided)
            if (params.data['image'] && params.data['image'].rawFile) {
                formData.append('image', params.data['image'].rawFile);
            }


            // Ensure it's an update request
            formData.append('_method', 'PUT');






            return httpClient(`${apiUrl}/admin/categories/${params.id}`, {
                method: 'POST',
                body: formData,
            }).then(({ json }) => ({ data: json }));
        }


        if (resource === 'subcategories') {

            const formData = new FormData();


            formData.append('name', params.data.name);
            formData.append('category_id', params.data['category_id']);

            // Handle image upload (if provided)
            if (params.data['image'] && params.data['image'].rawFile) {
                formData.append('image', params.data['image'].rawFile);
            }


            // Ensure it's an update request
            formData.append('_method', 'PUT');




            return httpClient(`${apiUrl}/admin/subcategories/${params.id}`, {
                method: 'POST',
                body: formData,
            }).then(({ json }) => ({ data: json }));
        }

        if (resource === 'translations' || resource === 'languages') {
            return httpClient(`${apiUrl}/admin/${resource}/${params.id}`, {
                method: 'PUT',
                body: JSON.stringify(params.data),
            }).then(({ json }) => ({ data: json }));
        }



        if (resource === 'services') {
            const formData = new FormData();
            formData.append('title', params.data.title);
            formData.append('subtitle', params.data.subtitle);
            formData.append('subtitle', params.data.subtitle);
            formData.append('text-title', params.data['text-title']);
            formData.append('description', params.data.description);

            if (params.data.image && params.data.image.rawFile) {
                formData.append('image', params.data.image.rawFile);  // Handle image file
            }

            if (params.data['article_image'] && params.data['article_image'].rawFile) {
                formData.append('article_image', params.data['article_image'].rawFile); // Ensure the raw file is appended
            }


            formData.append('_method', 'PUT');

            return httpClient(`${apiUrl}/admin/services/${params.id}`, {
                method: 'POST',
                body: formData,
            }).then(({ json }) => ({
                data: json,
            }));
        }

        if (resource === 'projects') {
            const formData = new FormData();
            formData.append('title', params.data.title);
            formData.append('text', params.data.text);
            formData.append('date', params.data.date);
            formData.append('client', params.data.client);
            formData.append('location', params.data.location);
            formData.append('category', params.data.category);

            if (params.data.image && params.data.image.rawFile) {
                formData.append('image', params.data.image.rawFile);  // Handle image file
            }


            if (params.data['article_image'] && params.data['article_image'].rawFile) {
                formData.append('article_image', params.data['article_image'].rawFile); // Ensure the raw file is appended
            }

            formData.append('_method', 'PUT');

            return httpClient(`${apiUrl}/admin/projects/${params.id}`, {
                method: 'POST',
                body: formData,
            }).then(({ json }) => ({
                data: json,
            }));
        }



        if (resource === 'statictexts') {
            const formData = new FormData();
            formData.append('key', params.data.key);
            formData.append('text', params.data.text);
            formData.append('_method', 'PUT');

            return httpClient(`${apiUrl}/admin/static/${params.id}`, {
                method: 'POST',
                body: formData, // Send the FormData with the file

            }).then(({ json }) => ({ data: json.data }));
        }

        // Fallback for other resources
        return simpleRestProvider(apiUrl, httpClient).update(resource, params);
    },

    // Create a new entry (this could also handle AboutUs creation)
    create: (resource, params) => {
        if (resource === 'about-us') {
            const formData = new FormData();

            // Append AboutUs fields
            formData.append('header_text', params.data.header_text);
            formData.append('short_description', params.data.short_description);
            formData.append('long_description', params.data.long_description || '');
            formData.append('image_alt', params.data.image_alt || '');

            // Handle image upload (if provided)
            if (params.data['left_image'] && params.data['left_image'].rawFile) {
                formData.append('left_image', params.data['left_image'].rawFile);
            }

            return httpClient(`${apiUrl}/admin/about-us`, {
                method: 'POST',
                body: formData,
            }).then(({ json }) => ({ data: json }));
        }

        if (resource === 'partners') {
            const formData = new FormData();
            formData.append('alt_text', params.data.alt_text);
            formData.append('website_link', params.data.website_link);

            if (params.data.logo && params.data.logo.rawFile) {
                formData.append('logo', params.data.logo.rawFile);  // Handle logo file
            }

            return httpClient(`${apiUrl}/admin/partners`, {
                method: 'POST',
                body: formData,
            }).then(({ json }) => ({
                data: json,
            }));
        }


        if (resource === 'products') {
            const formData = new FormData();


            formData.append('title', params.data.title);
            formData.append('description', params.data.description);
            formData.append('subcategory_id', params.data.subcategory_id);
            formData.append('client', params.data.client);
            formData.append('location', params.data.location);
            formData.append('date', params.data.date);

            // Handle image upload (if provided)
            if (params.data['image'] && params.data['image'].rawFile) {
                formData.append('image', params.data['image'].rawFile);
            }


            // Ensure it's an update request

            // Send the request
            return httpClient(`${apiUrl}/admin/products`, {
                method: 'POST',  // To support file uploads, using POST with PUT method override
                body: formData,
            }).then(({ json }) => ({
                data: json,
            }));
        }

        if (resource === 'brandvalues') {
            const formData = new FormData();

            // Append AboutUs fields
            formData.append('title', params.data.title);
            formData.append('description', params.data.description);

            // Handle image upload (if provided)
            if (params.data.icon && params.data.icon.rawFile) {
                formData.append('icon', params.data.icon.rawFile);
            }



            // Send the request
            return httpClient(`${apiUrl}/admin/about-us/${params.data['about_us_id']}/brandValues`, {
                method: 'POST',  // To support file uploads, using POST with PUT method override
                body: formData,
            }).then(({ json }) => ({
                data: json,
            }));
        }



        if (resource === 'subbrands') {
            const formData = new FormData();

            // Append AboutUs fields
            formData.append('logo_alt', params.data['logo_alt']);


            // Handle image upload (if provided)
            if (params.data.logo && params.data.logo.rawFile) {
                formData.append('logo', params.data.logo.rawFile);
            }




            // Send the request
            return httpClient(`${apiUrl}/admin/about-us/${params.data['about_us_id']}/subbrands`, {
                method: 'POST',  // To support file uploads, using POST with PUT method override
                body: formData,
            }).then(({ json }) => ({
                data: json,
            }));
        }






        if (resource === 'projects') {
            const formData = new FormData();
            formData.append('title', params.data.title);
            formData.append('text', params.data.text);
            formData.append('date', params.data.date);
            formData.append('client', params.data.client);
            formData.append('location', params.data.location);
            formData.append('category', params.data.category);

            if (params.data.image && params.data.image.rawFile) {
                formData.append('image', params.data.image.rawFile);  // Handle image file
            }


            if (params.data['article_image'] && params.data['article_image'].rawFile) {
                formData.append('article_image', params.data['article_image'].rawFile); // Ensure the raw file is appended
            }

            return httpClient(`${apiUrl}/admin/projects`, {
                method: 'POST',
                body: formData,
            }).then(({ json }) => ({
                data: json,
            }));
        }

        if (resource === 'contactings') {
            const formData = new FormData();
            formData.append('name', params.data.name);
            formData.append('mail', params.data.mail);

            if (params.data.image && params.data.image.rawFile) {
                formData.append('image', params.data.image.rawFile);
            }

            return httpClient(`${apiUrl}/admin/contactings`, {
                method: 'POST',
                body: formData,
            }).then(({ json }) => ({
                data: json,
            }));
        }


        if (resource === 'services') {
            const formData = new FormData();
            formData.append('title', params.data.title);
            formData.append('subtitle', params.data.subtitle);
            formData.append('text-title', params.data['text-title']);
            formData.append('description', params.data.description);
            if (params.data.image && params.data.image.rawFile) {
                formData.append('image', params.data.image.rawFile);  // Handle image file
            }

            if (params.data['article_image'] && params.data['article_image'].rawFile) {
                formData.append('article_image', params.data['article_image'].rawFile); // Ensure the raw file is appended
            }

            return httpClient(`${apiUrl}/admin/services`, {
                method: 'POST',
                body: formData,
            }).then(({ json }) => ({
                data: json,
            }));
        }
        // Fallback for settings resource creation
        if (resource === 'settings') {
            return httpClient(`${apiUrl}/admin/settings`, {
                method: 'POST',
                body: JSON.stringify(params.data),
            }).then(({ json }) => ({ data: json }));
        }


        if (resource === 'statictexts') {
            const formData = new FormData();
            formData.append('key', params.data.key);
            formData.append('text', params.data.text);


            return httpClient(`${apiUrl}/admin/static`, {
                method: 'POST',
                body: formData, // Send the FormData with the file

            }).then(({ json }) => ({ data: json.data }));
        }


        if (resource === 'pages') {
            const formData = new FormData();
            formData.append('title', params.data.title);
            formData.append('slug', params.data.slug);
            formData.append('hero_title', params.data['hero_title']);
            formData.append('hero_description', params.data['hero_description']);
            formData.append('link', params.data['link']);
            formData.append('is_active', Number(params.data['is_active']));
            if (params.data['hero_image'] && params.data['hero_image'].rawFile) {
                formData.append('hero_image', params.data['hero_image'].rawFile); // Ensure the raw file is appended
            }

            return httpClient(`${apiUrl}/admin/pages`, {
                method: 'POST',
                body: formData, // Send the FormData with the file

            }).then(({ json }) => {

                return {data: json.data }


            });
        }

        if (resource === 'translations' || resource === 'languages') {
            return httpClient(`${apiUrl}/admin/${resource}`, {
                method: 'POST',
                body: JSON.stringify(params.data),
            }).then(({ json }) => ({ data: json }));
        }


        if (resource === 'categories') {

            const formData = new FormData();


            formData.append('name', params.data.name);


            // Handle image upload (if provided)
            if (params.data['image'] && params.data['image'].rawFile) {
                formData.append('image', params.data['image'].rawFile);
            }



            return httpClient(`${apiUrl}/admin/categories`, {
                method: 'POST',
                body: formData,
            }).then(({ json }) => ({ data: json }));
        }


        if (resource === 'subcategories') {

            const formData = new FormData();


            formData.append('name', params.data.name);


            // Handle image upload (if provided)
            if (params.data['image'] && params.data['image'].rawFile) {
                formData.append('image', params.data['image'].rawFile);
            }




            return httpClient(`${apiUrl}/admin/categories/${params.data.category_id}/subcategories`, {
                method: 'POST',
                body: formData,
            }).then(({ json }) => ({ data: json }));
        }


        if (resource === 'blogs') {
            const formData = new FormData();
            formData.append('title', params.data.title);
            formData.append('subtitle', params.data.subtitle);
            formData.append('content', params.data.content);

            if (params.data.image && params.data.image.rawFile) {
                formData.append('image', params.data.image.rawFile);
            }

            if (params.data['article_image'] && params.data['article_image'].rawFile) {
                formData.append('article_image', params.data['article_image'].rawFile); // Ensure the raw file is appended
            }

            return httpClient(`${apiUrl}/admin/blogs`, {
                method: 'POST',
                body: formData,
            }).then(({ json })=> ({ data: json })).catch(({e}) => {console.log(e)});
        }

        // Fallback for other resources
        return simpleRestProvider(apiUrl, httpClient).create(resource, params);
    },

    getMany:
        (resource, params) => {

        if (resource === 'about-us' || resource === 'brandvalues' ) {
                return httpClient(`${apiUrl}/about-us`)
                    .then(({ json }) => {
                        return {data: Array(json)}

                    });
            }

        else if (resource === 'categories') {
            return httpClient(`${apiUrl}/categories`)
                .then(({ json }) => ({

                    data: json,
                    total: json.length //
                }));
        }


        else {
            const query = {
                filter: JSON.stringify({id: params.ids}),
            };
            const url = `${apiUrl}/${resource}?${queryString.stringify(query)}`;
            return httpClient(url).then(({json}) => ({
                data: json.data,
            }));

        }



    },

    getManyReference: (resource, params) => {
        const { page, perPage } = params.pagination;
        const { field, order } = params.sort;
        const query = {
            sort: field,
            order: order,
            page: page,
            per_page: perPage,
            filter: params.filter,
        };
        const url = `${apiUrl}/${resource}?${queryString.stringify(query)}`;
        return httpClient(url).then(({ json }) => ({
            data: json.data,
            total: json.meta.total,
        }));
    },










    // Handle deleting the AboutUs resource
    delete: (resource, params) => {
        if (resource === 'about-us') {
            return httpClient(`${apiUrl}/admin/about-us/${params.id}`, {
                method: 'DELETE',
            }).then(({ json }) => ({
                data: json,
            }));
        }

        // Fallback for settings resource delete
        if (resource === 'settings') {
            return httpClient(`${apiUrl}/admin/settings/${params.id}`, {
                method: 'DELETE',
            }).then(({ json }) => ({ data: json }));
        }




        if (resource === 'blogs') {
            return httpClient(`${apiUrl}/admin/blogs/${params.id}`, {
                method: 'DELETE',
            }).then(({ json }) => ({
                data: json,
            }));
        }


        if (resource === 'statictexts') {
            const formData = new FormData();
            return httpClient(`${apiUrl}/admin/static/${params.id}`, {
                method: 'DELETE',
                body: formData, // Send the FormData with the file

            }).then(({ json }) => ({ data: json }));
        }

        if (resource === 'partners') {
            return httpClient(`${apiUrl}/admin/partners/${params.id}`, {
                method: 'DELETE',
            }).then(({ json }) => ({
                data: json,
            }));
        }

        if (resource === 'contactings') {
            return httpClient(`${apiUrl}/admin/contactings/${params.id}`, {
                method: 'DELETE',
            }).then(({ json }) => ({
                data: json,
            }));
        }


        if (resource === 'translations' || resource === 'languages') {
            return httpClient(`${apiUrl}/admin/${resource}/${params.id}`, {
                method: 'DELETE',
            }).then(({ json }) => ({ data: json }));
        }

        if (resource === 'projects') {
            return httpClient(`${apiUrl}/admin/projects/${params.id}`, {
                method: 'DELETE',
            }).then(({ json }) => ({
                data: json,
            }));
        }

        if (resource === 'services') {
            return httpClient(`${apiUrl}/admin/services/${params.id}`, {
                method: 'DELETE',
            }).then(({ json }) => ({
                data: json,
            }));
        }

        if (resource === 'brandvalues' || resource === 'subbrands') {
            return httpClient(`${apiUrl}/admin/about-us/${resource == 'brandvalues' ? 'brandValue' : 'subbrand'}/${params.id}`, {
                method: 'DELETE',
            }).then(({ json }) => ({
                data: json,
            }));
        }

        if (resource === 'pages') {
            return httpClient(`${apiUrl}/admin/page/${params.id}`, {
                method: 'DELETE',
            }).then(({ json }) => ({ data: json }));
        }

        if (resource === 'products') {
            return httpClient(`${apiUrl}/admin/products/${params.id}`, {
                method: 'DELETE',
            }).then(({ json }) => ({ data: json }));
        }

        if (resource === 'categories') {
            return httpClient(`${apiUrl}/admin/categories/${params.id}`, {
                method: 'DELETE',
            }).then(({ json }) => ({ data: json }));
        }


        if (resource === 'subcategories') {
            return httpClient(`${apiUrl}/admin/subcategories/${params.id}`, {
                method: 'DELETE',
            }).then(({ json }) => ({ data: json }));
        }

        // Fallback for other resources
        return simpleRestProvider(apiUrl, httpClient).delete(resource, params);
    },
};

export const dataProvider  = myDataProvider
