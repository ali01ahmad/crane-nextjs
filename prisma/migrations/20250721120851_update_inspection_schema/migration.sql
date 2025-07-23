-- CreateTable
CREATE TABLE "Inspection" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "name" TEXT NOT NULL,
    "comments" TEXT NOT NULL,
    "status" TEXT NOT NULL DEFAULT 'Active',
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "userId" INTEGER NOT NULL,
    "craneId" INTEGER NOT NULL,
    CONSTRAINT "Inspection_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "Inspection_craneId_fkey" FOREIGN KEY ("craneId") REFERENCES "Crane" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "Crane" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "serial_number" TEXT NOT NULL,
    "model" TEXT NOT NULL,
    "location" TEXT NOT NULL,
    "status" TEXT NOT NULL DEFAULT 'Active',
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP
);

-- CreateTable
CREATE TABLE "Inspection_list" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "inspectionId" INTEGER NOT NULL,
    "item" TEXT NOT NULL,
    "remarks" TEXT NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT "Inspection_list_inspectionId_fkey" FOREIGN KEY ("inspectionId") REFERENCES "Inspection" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
