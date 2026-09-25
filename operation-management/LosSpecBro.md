# Contexto General
la consigna del ejercicio esta en ../../Consigna.pdf
estamos trabajando en un proyecto de libros circulares

¿           Reglas Generales de Tipografia         ?
    El sistema esta comunicado con otros tener en cuenta 

    el tipeo todo lo que es clases lo tengo en ingles 
¿                                                  

# Contexto de este servicio
Tenemos 2 servicios terminados teoricamente, copy management, y user management

Y su comunicacion es: Mediante una Api rest en nest mediante Http que el direcotrio de src tenga una logica de comunicaion de la siguiente manera

## Restricciones Tecnicas

# Especificaciones de este servicio 

## Entidades a Modelar

Loan{
    id
    owner
    ownerLoan
    copyId
    dateBegin
    dateEnd
}

Return{
    id
    Loan
    date

}

Assignment{
    id
    copyId
    owner
    ownerAssignment
    date
}

UnsuscribeB{
    id
    copyId
    date
}
## Operaciones Permitidas - Flujo
Crean un metodo $Comunication en este metodo se tiene en cuenta la comunicacion entre community y person, mediante este metodo se le cambia el estado a las unidades, teniendo en cuenta las restricciones tecnicas del sistema.

### Loan
Post desde Loan
desde post loan debo que la persona que tenia en el momento de la operacion el libro, se le cambia el estado a la unidad a prestado y se le asigna la fecha de inicio de prestamo y la fecha de fin de prestamo, y se le asigna el owner del prestamo que es la persona que lo tiene en ese momento, si es propietario y esta en loan el libro NO PODRA hacer otro loan porque no lo tiene en su poder

### Return
Post desde Return
el return es el VENCIMIENTO del prestamo sin que haya un nuevo prestamo, por lo que el libro es devuelto a su propietario.
Este proceso deberia ser automatico, pero vamos a hacerlo a traves de un post de forma manual.

### Assignment
Post desde Assignment
el assignment es la cesion de la propiedad del libro, por lo que el libro cambia el id del owner, el assignment no es necesario tenerlo en el poder se puede hacer en cualquier momento.

### UnsuscribeB
Post desde UnsuscribeB
UnsuscribeB es la baja del libro, por lo que no se puede ejercer sobre el ninguna operacion, ni prestamo, ni devolucion, ni cesion de propiedad.


 
## ConsultEndpoint
Get Operation/user/id recibe el ownerId de copy y para darse de baja de una comunidad tiene que tener todas las operaciones cerradas

Y este endpoint debe devolver true o false en caso de que el ownerId tenga todas las operaciones cerradas devolver True en otro caso no.

Operaciones cerradas significa que todos los prestamos que tenga asociados a el tengan una devolucion asociada, tanto si el owner lo presto como el ownerLoan.

## Casos Bordes

!Siempre tener en cuenta las restricciones del sistema!

Antes de cada operacion deberiamos verificar que la copyID no este dado de baja 

