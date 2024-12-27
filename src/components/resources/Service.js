import React from 'react';
import { List, Datagrid, TextField, EditButton, DeleteButton, SearchInput, Edit, Create, SimpleForm, TextInput, ImageField, ImageInput } from 'react-admin';
import {TextareaAutosize} from "@mui/material";

// List component for Service


const ServiceFilters = [
    <SearchInput source="search"   alwaysOn/>,
];

export const ServiceList = props => (
    <List {...props} filters={ServiceFilters}>
        <Datagrid>
            <TextField source="id" />
            <TextField source="title" />
            <TextField source="subtitle" />
            <TextField source="text-title" />
            <TextField  source="description" />
            <ImageField source="article_image" />
            <ImageField source="src" />
            <EditButton basePath="/services" />
            <DeleteButton basePath="/services" />
        </Datagrid>
    </List>
);

// Edit component for Service
export const ServiceEdit = props => (
    <Edit {...props}>
        <SimpleForm>
            <TextInput source="title" />
            <TextInput source="subtitle" />
            <TextInput source="text-title" />
            <TextInput  source="description" multiline/>

            <ImageInput source="article_image" label="Service Article Image" accept="image/*">
                <ImageField source="src" />
            </ImageInput>

            <ImageInput source="image" label="Service Image" accept="image/*">
                <ImageField source="src" />
            </ImageInput>
        </SimpleForm>
    </Edit>
);

// Create component for Service
export const ServiceCreate = props => (
    <Create {...props}>
        <SimpleForm>
            <TextInput source="title" multiline required />
            <TextInput source="subtitle"  required />
            <TextInput source="text-title"  required />
            <TextInput  source="description" required />
            <ImageInput source="article_image" label="Service Article Image" accept="image/*" required>
                <ImageField source="src" />
            </ImageInput>


            <ImageInput source="image" label="Service Image" accept="image/*" required>
                <ImageField source="src" />
            </ImageInput>
        </SimpleForm>
    </Create>
);
