import {Body, Controller, Delete, Get, Post} from '@nestjs/common';
import {ContainerService} from "./container.service";
import {ContainerEntity} from "./container.entity";

@Controller('container')
export class ContainerController {
    constructor(private containerService: ContainerService) {}

    @Get()
    async findAll(): Promise<ContainerEntity[]>{
        return this.containerService.findAll()
    }

    @Post()
    async save(@Body() container: SaveDto): Promise<ContainerEntity>{
        return this.containerService.save(container as ContainerEntity)
    }

    @Delete()
    async remove(@Body() container: DeleteDto): Promise<ContainerEntity>{
        return this.containerService.remove(container as ContainerEntity)
    }
}
