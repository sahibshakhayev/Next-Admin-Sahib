// src/staticTexts.js
import * as React from "react";
import {List, Datagrid, TextField, EditButton, Edit, SimpleForm, TextInput, Create, DeleteButton} from "react-admin";



const staticFilters = [
    <TextInput label="Search" source="search" alwaysOn />,
];




export const StaticTextList = () => (
    <List filters={staticFilters}   >
        <Datagrid rowClick="edit">
            <TextField source="id" />
            <TextField source="key" />
            <TextField source="text" />
            <EditButton />
            <DeleteButton />
        </Datagrid>
    </List>
);

// Edit View for StaticText
export const StaticTextEdit = () => (
    <Edit>
        <SimpleForm>
            <TextInput source="key" />
            <TextInput source="text"  multiline/>
        </SimpleForm>
    </Edit>
);

// Create View for StaticText
export const StaticTextCreate = () => (
    <Create>
        <SimpleForm>
            <TextInput source="key" required />
            <TextInput source="text" multiline  required />
        </SimpleForm>
    </Create>
);


