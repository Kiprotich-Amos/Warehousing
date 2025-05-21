// Copyright (c) 2025, Amos Kiprotich Rono and contributors
// For license information, please see license.txt

frappe.ui.form.on("Cargo Stock Receipt", {
	refresh(frm) {
        frm.set_df_property("bond_amount", "hidden", frm.doc.source !=="Transit");
	},
    source(frm){
        frm.toggle_display("bond_amount", frm.doc.source === "Transit");
        frm.toggle_display("bol_no", ["Transit", "Import"].includes(frm.doc.source));
        frm.toggle_display("dn_no", frm.doc.source);
        frm.toggle_display("collection_instruction", frm.doc.source === "Collection");
    },
    received_items_on_from_rendered(frm){
        frm.fields_dict.received_items.grid.wrapper.on("change", () =>{
            calculate_totals(frm);
        });
    }
});
function calculate_totals(frm){
    let total_packages = 0;
    let total_gross = 0;
    let total_net = 0;

    frm.doc.received_items.forEach((row) => {
        total_packages += row.package_qty || 0;
        total_gross += row.gross_weight || 0;
        total_net += row.net_weight
    });

    frm.set_value("total_packages", total_packages);
    frm.set_value("total_gross_weight", total_gross);
    frm.set_value("total_net_weight", total_net);
    frm.set_value("total_net_weight_tonnes", total_net/1000)
}