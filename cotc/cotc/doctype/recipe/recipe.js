// Copyright (c) 2023, Geordie Everitt and contributors
// For license information, please see license.txt
// JavaScript

console.log('recipe.js loaded');

frappe.ui.form.on('Recipe', {
    refresh: function(frm) {
        frm.add_custom_button('Generate Recipe', function() {
            let d = new frappe.ui.Dialog({
                title: 'Enter Prompt',
                fields: [
                    {
                        label: 'Prompt',
                        fieldname: 'prompt',
                        fieldtype: 'text',
                        reqd: 1
                    }
                ],
                primary_action_label: 'Generate',
                primary_action(values) {
                    frappe.call({
                        method: 'cotc.cult_of_the_carrot.doctype.recipe.recipe.create_recipe_from_form',
                        args: { prompt_value: values.prompt },
                        callback: function(r) {
                            if (r.message) {
                                frm.set_value('ingredients', r.message.ingredients);
                                frm.set_value('instructions', r.message.instructions);
                                frm.refresh();
                            }
                        }
                    });
                    d.hide();
                }
            });
            d.show();
        });
    }
});
