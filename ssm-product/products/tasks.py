import plantuml


def generate_diagram(source, desired_diagram='svg'):

    plantuml_server = 'http://www.plantuml.com/plantuml/'

    if desired_diagram == 'png':
        plantuml_link = plantuml_server + 'png/'
    else:
        plantuml_link = plantuml_server + 'svg/'
    uml_engine = plantuml.PlantUML(url=plantuml_link)
    generated_file_link = uml_engine.get_url(source)

    return generated_file_link
