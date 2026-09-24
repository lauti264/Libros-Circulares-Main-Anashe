# Contexto General
la consigna del ejercicio esta en ../../Consigna.pdf
estamos trabajando en un proyecto de libros circulares

¿           Reglas Generales de Tipografia         ?
    El sistema esta comunicado con otros tener en cuenta 

    el tipeo todo lo que es clases lo tengo en ingles 
    tener en cuenta eso como lo puse el diagramas puml checkear el tipeo con eso que eso esta bien 
¿                                                   ?
el diagrama de clases esta en diagramas.puml

# Contexto de este servicio



# Restricciones Tecnicas

para darse de baja de una comunidad una persona debe tener todas sus operaciones cerradas hacer un get de operation management recibiendo el id de la persona y 
Las operaciones permitidas son el préstamo, devolución, la cesión de la propiedad y la baja del ejemplar, todo esto vive en otro servicio y nosotros tenemos que hacer un get de ese servicio no esta en local

Metodos a Aplicar

Mediante una Api rest en nest mediante Http que el direcotrio de src tenga una logica de comunicaion de la siguiente manera

# Especificacion de este Servicio

## Entidades A modelar 
Person
{
    id
    name
    surname
    dni
    contactPerson
    fdn
    communities[]
    contactMethod[] 
}

Community{
    id
    name
    persons []
}

contactMethod{
    tipe
    value 
    favourite
}

## Operaciones Permitidas - Flujos

Crean un metodo $Comunication en este metodo se tiene en cuenta la comunicacion entre community y person, mediante este metodo se agrega person a una community y se le considera activo o inactivo , teniendo en cuenta las restricciones tecnicas del sistema. Para agregar una persona a una community se checkea su actividad en cada una que esta registrada y si esta en mas de 3 tiene que ser inactivada de una, tiene que tener sus operaciones cerradas
### Person
Desde person

$Get
muestra las person 

$Post 
de person manda creando una person
se apuede agregar a una comunidad, y el metodo de contacto, pero para la persona de contacto ya debe estar creada y registrada en el sistema, ya que no se puede crear una persona de contacto desde la creacion de una persona (siendo menor).


$PATCH
de persona manda actualizando una persona actualizando personaContacto, comunidades y MedioContacto ya que id,dni nombre y apellido no se pueden actualizar

  

$DELETE 
de persona manda eliminando una persona

### Community

Desde Comunidad

$Get
se recibe una lista de comunidades y sus arrays correspondientes

$Post
crea una comunidad con id y nombre unico, el array de personas se llena con el post de persona a comunidad, no se puede crear una comunidad con personas ya que no se puede crear una persona desde comunidad o publicar una persona desde comunidad

$PATCH
Desde el patch se puede actualizar tanto el nombre y las personas que la integran, no se puede agregar una persona si no que se puede actualzar a sus integrantes, es decir que si una persona quiere agregarse a una comunidad debe eliminarse de otra y luego agregarse se hace todo desde post y delete de persona, no se puede agregar una persona desde comunidad, solo se puede actualizar el array de personas que la integran.

$DELETE

elimina la comunidad  pero no elimina a las personas, solo elimina la comunidad y el array de personas que la integran, pero las personas siguen existiendo en el sistema, y estas mismas se le resta en su array de comunidades a las que pertenecen, es decir que si una persona pertenece a 3 comunidades y se elimina una de ellas, la persona sigue existiendo pero ahora pertenece a 2 comunidades.

### Contact Method

$get/id

get id de persona devuelve el array de medios de contacto de la persona

$post/id

$post id postea desde el id de persona y crea un medio de contacto para esa persona, el tipo puede ser email, telefono o direccion, el valor es el valor del medio de contacto y preferido es un booleano que indica si es el medio de contacto preferido de la persona. 

$PATCH/id

$patch id patch de medio de contacto, se puede actualizar el tipo, valor y preferido del medio de contacto, pero no se puede cambiar el id de la persona a la que pertenece el medio de contacto.

$DELETE/id

elimina el medio de contacto de la persona, pero no elimina a la persona, solo elimina el medio de contacto de la persona, y si era el medio de contacto preferido, se debe actualizar el preferido de otro medio de contacto de la persona.

## Casos Bordes

!Siempre tener en cuenta las restricciones del sistema!
    Usar id Como identificador unico de cada entidad
    
    Persona no necesita para crearse una persona de 
    contacto siempre y cuando sea MAYOR en ese caso 
    necesita una persona de contacto que sea MAYOR ya registrada    

    Una persona puede pertenecer a maximo 3 comunidades, y para querer inscribirce a una debe eliminar otra desde el $patch o $delete consecuentemente y agregarlo desde un post esta 
    nueva

    Para crear UN MEDIO DE CONTACTO debe existir la persona de antemano

    No se puede crear una persona con el mismo dni, ni con el mismo id.

!                                                     !