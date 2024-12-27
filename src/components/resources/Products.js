import React, {useEffect, useState} from 'react';
import {useWatch} from "react-hook-form";
import {
    List,
    Datagrid,
    TextField,
    EditButton,
    TextInput,
    SelectInput,
    Create,
    SimpleForm,
    ReferenceInput,
    ImageInput,
    ImageField,
    useDataProvider,
    Edit,
    useRecordContext,
    DateInput,
    DeleteButton,
    ReferenceField
} from 'react-admin';



const SubcategoryInput = (props) => {
    const [subcategories, setSubcategories] = useState([]);
    const dataProvider = useDataProvider();

    const record = useRecordContext(); // Get current record (for edit mode)

    // Watch category_id from form (when the user selects it) or fall back to the record's value
    const categoryId = useWatch({ name: 'category_id' }) || record?.category_id;

    useEffect(() => {
        if (categoryId) {
            // Fetch subcategories for the selected or current category
            dataProvider.getList('subcategories', { filter: { category_id: categoryId } })
                .then(({ data }) => setSubcategories(data))
                .catch(error => {
                    console.error('Error fetching subcategories:', error);
                    setSubcategories([]);
                });
        } else {
            // Clear subcategories if no category is selected
            setSubcategories([]);
        }
    }, [categoryId, dataProvider]);

    return (
        <SelectInput
            source="subcategory_id"
            choices={subcategories}
            optionText="name"
            optionValue="id"
            label="Subcategory"
            {...props}
        />
    );
};

export default SubcategoryInput;





// Define the search filter
const productFilters = [
    <TextInput source="search" label="Search" alwaysOn />,
    <ReferenceInput label="Category" source="category_id" reference="categories" allowEmpty>
        <SelectInput optionText="name" />
    </ReferenceInput>
];



export const ProductList = (props) => (
    <List {...props} filters={productFilters}>
        <Datagrid>
            <TextField source="id" />
            <TextField source="title" />
            <TextField source="description" />
            <ReferenceField label="Category" source="category_id" reference="categories">
                <TextField source="name" label="Category" />
            </ReferenceField>

            <ReferenceField label="Category" source="category_id" reference="categories">
            <TextField source="name" label="Subcategory" />
            </ReferenceField>
            <EditButton />
            <DeleteButton/>
        </Datagrid>
    </List>
);

export const ProductCreate = (props) => (
    <Create {...props}>
        <SimpleForm>
            <TextInput source="title" />
            <TextInput source="description" />
            <TextInput source="client" />
            <TextInput source="location" />
            <DateInput source="date" />

            <ReferenceInput label="Category" source="category_id" reference="categories">
                <SelectInput optionText="name" />
            </ReferenceInput>

            {/* Dependent Subcategory Select */}
            <SubcategoryInput />

            {/* Image Upload */}
            <ImageInput source="image" label="Product Image">
                <ImageField source="src" title="title" />
            </ImageInput>
        </SimpleForm>
    </Create>
);

export const ProductEdit = (props) => (
    <Edit {...props}>
        <SimpleForm>
            <TextInput source="title" />
            <TextInput source="description" />
            <TextInput source="client" />
            <TextInput source="location" />
            <DateInput source="date" />

            <ReferenceInput label="Category" source="category_id" reference="categories">
                <SelectInput optionText="name" />
            </ReferenceInput>

            {/* Dependent Subcategory Select */}
            <SubcategoryInput />

            {/* Image Upload */}
            <ImageInput source="image" label="Product Image" accept="image/*">
                <ImageField source="src" title="title" />
            </ImageInput>
        </SimpleForm>
    </Edit>
);
