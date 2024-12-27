
import * as React from 'react';
import {Menu, MenuItemLink, useResourceDefinitions} from 'react-admin';
import { Box } from '@mui/material';
import {API_BASE_URL} from "../../providers/config";
import {useState} from "react";
import ProductIcon from '@mui/icons-material/List';
import CategoryIcon from '@mui/icons-material/Category';
import SubcategoryIcon from '@mui/icons-material/SubdirectoryArrowRight';



const inflection = require( 'inflection' );

const CustomMenu = (props) => {
    const [productsMenuOpen, setProductsMenuOpen] = useState(false); // To handle toggle for nested menu
    const resources = useResourceDefinitions();
    // Toggle products sub-menu open/close
    const handleToggleProductsMenu = () => {
        setProductsMenuOpen(!productsMenuOpen);
    };

    const getResourceLabel = (name) => {
        const label = resources[name]?.options?.label || name;
        return typeof label === 'string' ? inflection.capitalize(label) : name;
    };


    return (
        <div style={{paddingTop:5}}>

            {Object.keys(resources)
                .filter((name) => !['products', 'categories', 'subcategories'].includes(name))
                .map((name) => (
                    <MenuItemLink
                        key={name}
                        to={`/${name}`}
                        primaryText={getResourceLabel(name)}
                        leftIcon={resources[name].icon ? React.createElement(resources[name].icon) : null}
                    />
                ))}

            {resources.products && (
                <MenuItemLink
                    to="/products"
                    primaryText="Products"
                    leftIcon={<ProductIcon />}
                    onClick={handleToggleProductsMenu}
                />
            )}

            {productsMenuOpen && (
                <div style={{ paddingLeft: 20 }}>
                    {/* Nested Categories */}
                    {resources.categories && (
                        <MenuItemLink
                            to="/categories"
                            primaryText="Categories"
                            leftIcon={<CategoryIcon />}
                        />
                    )}

                    {/* Nested Subcategories */}
                    {resources.subcategories && (
                        <MenuItemLink
                            to="/subcategories"
                            primaryText="Subcategories"
                            leftIcon={<SubcategoryIcon />}
                        />
                    )}
                </div>
            )}



        </div>
)};

export default CustomMenu;
