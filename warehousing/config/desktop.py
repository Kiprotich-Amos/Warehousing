from frappe import _

def get_data():
    return[
        {
            "module_name": "Warehousing",
            "color": "green",
            "icon": "octicon octicon-package",
            "type": "module",
            "label": _("Warehousing"),
            "link": "workspace/warehousing"
        }
    ]