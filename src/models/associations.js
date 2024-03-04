const Company = require("./companyModel");
const Departement = require("./departementModel");
const Manager = require("./managerModel");
const User = require("./userModel");
const Employee = require("./employeeModel");

Manager.belongsTo(User, { foreignKey: 'userId' });
User.hasOne(Manager, { foreignKey: 'userId' });

Manager.belongsTo(Company, { foreignKey: "companyId" });
Company.hasMany(Manager, { foreignKey: "companyId" });

Departement.belongsTo(Company, { foreignKey: 'companyId' });
Company.hasMany(Departement, { foreignKey: 'companyId' });

Employee.belongsTo(User, { foreignKey: 'userId' });
Employee.belongsTo(Company, { foreignKey: 'companyId' });
Employee.belongsTo(Departement, { foreignKey: 'departementId' });
Employee.belongsTo(Manager, { foreignKey: 'managerId' });

User.hasMany(Employee, { foreignKey: 'userId' });
Company.hasMany(Employee, { foreignKey: 'companyId' });
Departement.hasMany(Employee, { foreignKey: 'departementId' });
Manager.hasMany(Employee, { foreignKey: 'managerId' });