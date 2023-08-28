frappe.listview_settings['Recipe'] = {
    onload: function(listview) {
        setTimeout(() => {
            // Clear existing primary actions, including default 'New' button
            listview.page.clear_primary_action();
            
            // Add custom 'Generate Recipe' button
            listview.page.set_primary_action('Generate Recipe', function() {
                let d = new frappe.ui.Dialog({
                    title: 'Enter Prompt',
                    fields: [
                        {
                            label: 'Prompt',
                            fieldname: 'prompt',
                            fieldtype: 'Data',
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
                                    frappe.show_alert({message:'Recipe Created', indicator:'green'});
                                    listview.refresh();
                                }
                            }
                        });
                        d.hide();
                    }
                });
                d.show();
            });
        }, 500); // 500 ms delay
    }
};
