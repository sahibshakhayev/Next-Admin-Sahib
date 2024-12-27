import React from 'react';
import { List, Datagrid, TextField,EditButton, DeleteButton, SearchInput, Edit, Create, SimpleForm, TextInput, DateInput, ImageField, ImageInput } from 'react-admin';

// List component for Project

const ProjectFilters = [
    <SearchInput source="search"   alwaysOn/>,
];


export const ProjectList = props => (
    <List {...props} filters={ProjectFilters}>
        <Datagrid>
            <TextField source="id" />
            <TextField source="title" />
            <TextField source="text"  label="Text" multiline/>
            <TextField source="client" />
            <TextField source="location" />
            <TextField source="category" />
            <TextField source="date" />
            <ImageField source="article_image" />
            <ImageField source="src" />

            <EditButton basePath="/projects" />
            <DeleteButton basePath="/projects" />
        </Datagrid>
    </List>
);

// Edit component for Project
export const ProjectEdit = props => (
    <Edit {...props}>
        <SimpleForm>
            <TextInput source="title" />
            <TextInput source="text"  multiline />
            <TextInput source="client" />
            <TextInput source="location" />
            <TextInput source="category" />
            <DateInput source="date" />
            <ImageInput source="article_image" label="Project Article Image" accept="image/*">
                <ImageField source="src" />
            </ImageInput>
            <ImageInput source="image" label="Project Image" accept="image/*">
                <ImageField source="src" />
            </ImageInput>


        </SimpleForm>
    </Edit>
);

// Create component for Project
export const ProjectCreate = props => (
    <Create {...props}>
        <SimpleForm>
            <TextInput source="title" required />
            <TextInput source="text"  multiline  required/>
            <TextInput source="client" required />
            <TextInput source="location" required />
            <TextInput source="category" required />
            <DateInput source="date" required />
            <ImageInput source="article_image" label="Project Article Image" accept="image/*" required>
                <ImageField source="src" />
            </ImageInput>
            <ImageInput source="image" label="Project Image" accept="image/*" required>
                <ImageField source="src" />
            </ImageInput>
        </SimpleForm>
    </Create>
);
